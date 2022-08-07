import { Database } from '../config/database';
import { User } from '../entities/User.entity';
import argon2 from 'argon2';
import { GQLLoginInput, GQLRegisterInput, GQLUser } from '../graphql/graphqlTypes';

const registerUser = async ({ userName, email, password }: GQLRegisterInput): Promise<GQLUser> => {
  const user = new User();
  const userRepo = Database.getRepository(User);

  // check if user already exist
  const oldUser = await userRepo.findOneBy({ userName });

  if (oldUser) {
    throw new Error('this username is taken please input another');
  }

  user.userName = userName;
  user.email = email.toLowerCase();

  const hashedPass = await argon2.hash(password);
  user.password = hashedPass;

  const { password: pass, ...newUser } = await userRepo.save(user);

  return newUser;
};

const loginUser = async ({ userName, password }: GQLLoginInput): Promise<GQLUser> => {
  const user = await Database.getRepository(User)
    .createQueryBuilder('user')
    .where('user.userName = :userName', { userName })
    .addSelect('user.password')
    .getOne();

  if (!user) {
    throw new Error('user name does not exist');
  }

  // compare password
  const isMatched = await argon2.verify(user.password || '', password);

  if (!isMatched) {
    throw new Error('Incorrect password');
  }

  const { password: pass, ...newUser } = user;

  return newUser;
};

export const userBackend = { registerUser, loginUser };
