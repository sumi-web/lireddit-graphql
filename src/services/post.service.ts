import { Database } from '../config/database';
import { Post } from '../entities/Post.entity';
import { GQLPost, GQLPostInput } from '../graphql/graphqlTypes';

const createPost = async ({ title }: GQLPostInput): Promise<boolean> => {
  const post = new Post();
  post.title = title;

  const postRepo = Database.getRepository(Post);
  await postRepo.save(post);

  return true;
};

const getPost = async (id: string): Promise<GQLPost> => {
  const postRepo = await Database.getRepository(Post);
  const post = await postRepo.findOneBy({ id });
  if (!post) {
    throw new Error('post not found');
  }

  return post;
};

const getAllPost = async (): Promise<GQLPost[]> => {
  const postRepo = await Database.getRepository(Post);
  const posts = await postRepo.find();
  return posts;
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
