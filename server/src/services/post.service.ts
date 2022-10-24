import { ApolloError } from 'apollo-server-core';
import { Database } from '../config/database';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { GQLPost, GQLPostInput } from '../graphql/graphqlTypes';

const createPost = async (userId: string, { title, text }: GQLPostInput): Promise<boolean> => {
  const post = new Post();
  post.title = title;
  post.userId = userId;
  post.text = text;

  const postRepo = Database.getRepository(Post);
  // post.userId = userId;
  await postRepo.save(post);

  return true;
};

const getPost = async (id: string): Promise<GQLPost> => {
  const postRepo = await Database.getRepository(Post);
  const post = await postRepo.find({
    where: {
      id
    },
    relations: { userId: true }
  });

  console.log('check the post', post);

  if (!post) {
    throw new Error('post not found');
  }

  return post[0];
};

//  offset- gimme 10 post after the 5 post, with cursor- gimme location after this point
const getAllPost = async (limit: number, id?: string | null, cursor?: string | null) => {
  console.log('check the limit', limit, cursor, id);

  const realLimit = Math.min(50, limit);

  const postCount = await Database.manager.query(`SELECT COUNT('id') from post`);

  console.log('count', postCount);

  const posts = await Database.getRepository(Post)
    .createQueryBuilder('posts')
    .orderBy(`"createdDate"`, 'DESC')
    .take(realLimit);

  if (cursor && id) {
    const date = isNaN(Number(cursor)) ? new Date(cursor) : new Date(parseInt(cursor));
    posts.where(`"createdDate" < :cursor`, { cursor: date, id });
  }

  const allPosts = await posts.getMany();

  return { count: Number(postCount[0].count), posts: allPosts };

  // const postRepo = await Database.getRepository(Post);
  // const posts = await postRepo.find();
};

const deletePost = async (id: string): Promise<boolean> => {
  const postRepo = await Database.getRepository(Post);

  const post = await postRepo.findOneBy({ id });

  if (!post) {
    throw new Error('post not found');
  }

  await postRepo.remove(post);

  return true;
};

export const postBackend = { createPost, getPost, getAllPost, deletePost };
