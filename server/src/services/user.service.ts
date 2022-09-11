import { Database } from '../config/database';
import { User } from '../entities/user.entity';
import argon2 from 'argon2';
import { GQLLoginInput, GQLRegisterInput, GQLUser } from '../graphql/graphqlTypes';
import { MyContext } from '../types';
import { ApolloError } from 'apollo-server-core';
import { sendEmail } from '../utils/sendEmail';
import crypto from 'crypto';
import { generateUniqueKey } from '../utils/generateUniqueKey';
import Redis from 'ioredis';
import { Environment } from '../utils/environment';

const registerUser = async (
  { userName, email, password }: GQLRegisterInput,
  { req }: MyContext
): Promise<GQLUser> => {
  const user = new User();
  const userRepo = Database.getRepository(User);

  const manager = Database.manager;

  const oldUserUsername = await manager.query(
    `SELECT email FROM "user" where "userName"='${userName}'`
  );

  // check if user already exist
  // const oldUserUsername = await userRepo.findOneBy({ userName });

  if (oldUserUsername.length > 0)
    throw new ApolloError('username is taken please input another', 'Not_Permitted');

  // const oldUserWithEmail = await userRepo.findOneBy({ email });

  const oldUserWithEmail = await manager.query(`SELECT email FROM "user" where email='${email}'`);

  if (oldUserWithEmail.length > 0) throw new Error('email is already taken');

  // user.userName = userName;
  // user.email = email.toLowerCase();

  const hashedPass = await argon2.hash(password);
  // user.password = hashedPass;

  const newUser = await manager.query(
    `INSERT INTO "user" ("userName",email,password) VALUES ('${email}','${email.toLowerCase()}','${hashedPass}') RETURNING *`
  );

  // const newUser = await userRepo.save(user);

  req.session.userId = newUser[0].id;

  return newUser[0];
};

const loginUser = async (
  { userName, password }: GQLLoginInput,
  { req }: MyContext
): Promise<GQLUser> => {
  const manager = Database.manager;

  // const user = await Database.getRepository(User)
  //   .createQueryBuilder('user')
  //   .where('user.userName = :userName', { userName })
  //   .addSelect('user.password')
  //   .getOne();

  const user = await manager.query(`SELECT * FROM "user" where "userName"='${userName}'`);

  if (user.length === 0) {
    throw new Error('username does not exist');
  }

  // compare password
  const isMatched = await argon2.verify(user[0].password, password);

  if (!isMatched) {
    throw new Error('Incorrect password');
  }

  const { password: pass, ...newUser } = user[0];

  req.session.userId = user[0].id;

  return newUser;
};

const rehydrateUser = async ({ req }: MyContext) => {
  if (!req.session.userId) {
    return null;
  }

  const manager = Database.manager;

  const userRepo = Database.getRepository(User);

  const user = await manager.query(
    `SELECT id, "userName", "createdDate", "updatedDate", email FROM "user" where id ='${req.session.userId}'`
  );

  // console.log('check the user', user1);

  // const user = await userRepo.findOneBy({ id: req.session.userId });

  return user[0];
};

const forgotPassword = async (userName: string, redis: Redis): Promise<boolean> => {
  const userRepo = Database.getRepository(User);
  const manager = Database.manager;

  const user = await manager.query(`SELECT * FROM "user" where "userName" = '${userName}'`);

  // const user = await userRepo.findOneBy({ userName });

  if (user.length === 0) throw new ApolloError('user not found');

  const token = generateUniqueKey(20);

  const hash = crypto.createHash('sha256').update(token).digest('hex');

  await redis.set(Environment.forgotPasswordPrefix + hash, user[0].id, 'EX', 60 * 15); // expire in 15min

  console.log('check the token here', token);

  const html = `<a href="http://localhost:3000/forgot-password?hash=${token}">reset password</a>`;

  await sendEmail({ to: user[0].email, subject: 'Reset your password', html });

  return true;
};

const resetPassword = async (
  token: string,
  password: string,
  { redis, req }: MyContext
): Promise<GQLUser> => {
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const userRepo = Database.getRepository(User);
  const manager = Database.manager;

  const userId = await redis.get(Environment.forgotPasswordPrefix + hash);

  if (!userId) {
    throw new ApolloError('Reset password token is invalid or has been expired');
  }

  // const user = await userRepo.findOneBy({ id: userId });

  const user = await manager.query(
    `SELECT id, "userName", "createdDate", "updatedDate", email FROM "user" where id ='${userId}'`
  );

  if (user.length === 0) {
    throw new ApolloError('User not found');
  }

  console.log('check the user', user);

  const hashedPassword = await argon2.hash(password);

  const currentUser = await manager.query(
    `UPDATE "user" SET password = '${hashedPassword}' WHERE id = '${userId}' RETURNING *`
  );

  console.log('check current', currentUser);

  const newUser = currentUser.flat();

  // const currentUser = await userRepo.save(user);

  req.session.userId = newUser[0].id;

  return newUser[0];
};

// admin routes
const getAllUsers = async (): Promise<GQLUser[]> => {
  const users = await Database.manager.query(`SELECT * FROM "user"`);

  console.log('check the users', users);

  return users;
};

export const userBackend = {
  registerUser,
  loginUser,
  rehydrateUser,
  forgotPassword,
  resetPassword,
  getAllUsers
};
