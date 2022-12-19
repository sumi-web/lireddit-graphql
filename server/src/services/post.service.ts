import { Database } from '../config/database';
import { Post } from '../entities/post.entity';
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
    }
  });

  console.log('post called', post);

  if (!post) {
    throw new Error('post not found');
  }

  return post[0];
};

//  offset- gimme 10 post after the 5 post, with cursor- gimme location after this point
const getAllPost = async (sessionId: string, limit: number, cursor?: string | null) => {
  const realLimit = Math.min(200, limit);

  const postCount = await Database.manager.query(`SELECT COUNT('id') from post`);

  let date: Date | null = null;

  if (cursor) {
    console.log('date1', new Date(cursor), cursor);
  }

  if (cursor) date = isNaN(Number(cursor)) ? new Date(cursor) : new Date(parseInt(cursor));

  const posts = await Database.manager.query(
    `
  SELECT post.*,
  json_build_object(
    'userName',"user"."userName",
    'id',"user".id,
    'email', "user".email
  ) user ,
${
  sessionId
    ? '(select value from updoot where "userId" = $1 and "postId" = post.id) as "voteStatus"'
    : 'null as "voteStatus"'
}
   FROM post
   JOIN "user"
   ON "user".id = post."userId"
  ${cursor ? ` where post."createdDate" < '${cursor}'` : ''}
      order by "createdDate" DESC
      LIMIT ${realLimit}`,
    [sessionId]
  );

  // const posts = await Database.getRepository(Post)
  //   .createQueryBuilder('posts')
  //   .innerJoinAndSelect('posts.user', 'u', 'u.id = posts."userId"')
  //   .orderBy(`"createdDate"`, 'DESC')
  //   .take(realLimit);

  // if (cursor && id) {

  //   posts.where(`"createdDate" < :cursor`, { cursor: date, id });
  // }

  return { count: Number(postCount[0].count), posts };

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
