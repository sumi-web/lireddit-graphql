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

  // check if user already exist
  const oldUserUsername = await userRepo.findOneBy({ userName, email });

  if (oldUserUsername)
    throw new ApolloError('username is taken please input another', 'Not_Permitted');

  const oldUserWithEmail = await userRepo.findOneBy({ email });

  if (oldUserWithEmail) throw new Error('email is already taken');

  user.userName = userName;
  user.email = email.toLowerCase();

  const hashedPass = await argon2.hash(password);
  user.password = hashedPass;

  const newUser = await userRepo.save(user);

  req.session.userId = newUser.id;

  return newUser;
};

const loginUser = async (
  { userName, password }: GQLLoginInput,
  { req }: MyContext
): Promise<GQLUser> => {
  const user = await Database.getRepository(User)
    .createQueryBuilder('user')
    .where('user.userName = :userName', { userName })
    .addSelect('user.password')
    .getOne();

  if (!user) {
    throw new Error('username does not exist');
  }

  // compare password
  const isMatched = await argon2.verify(user.password || '', password);

  if (!isMatched) {
    throw new Error('Incorrect password');
  }

  const { password: pass, ...newUser } = user;

  req.session.userId = user.id;

  return newUser;
};

const rehydrateUser = async ({ req }: MyContext) => {
  console.log('check the session id%%', req.session.userId);

  if (!req.session.userId) {
    return null;
  }

  const userRepo = Database.getRepository(User);

  const user = await userRepo.findOneBy({ id: req.session.userId });

  return user;
};

const forgotPassword = async (userName: string, redis: Redis): Promise<boolean> => {
  const userRepo = Database.getRepository(User);

  const user = await userRepo.findOneBy({ userName });

  if (!user) throw new ApolloError('user not found');

  const token = generateUniqueKey(20);

  const hash = crypto.createHash('sha256').update(token).digest('hex');

  await redis.set(Environment.forgotPasswordPrefix + hash, user.id, 'EX', 60 * 15); // expire in 15min

  console.log('check the token here', token);

  const html = `<a href="http://localhost:3000/forgot-password?hash=${token}">reset password</a>`;

  await sendEmail({ to: user.email, subject: 'Reset your password', html });

  return true;
};

const resetPassword = async (
  token: string,
  password: string,
  { redis, req }: MyContext
): Promise<GQLUser> => {
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const userRepo = Database.getRepository(User);

  const userId = await redis.get(Environment.forgotPasswordPrefix + hash);

  if (!userId) {
    throw new ApolloError('Reset password token is invalid or has been expired');
  }

  const user = await userRepo.findOneBy({ id: userId });

  if (!user) {
    throw new ApolloError('User not found');
  }

  console.log('check the user', user);

  user.password = await argon2.hash(password);

  const currentUser = await userRepo.save(user);

  req.session.userId = currentUser.id;

  return currentUser;
};

export const userBackend = {
  registerUser,
  loginUser,
  rehydrateUser,
  forgotPassword,
  resetPassword
};
