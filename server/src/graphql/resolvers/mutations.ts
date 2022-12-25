import { ApolloError } from 'apollo-server-core';
import { postBackend } from '../../services/post.service';
import { updootBackend } from '../../services/updoot.service';
import { userBackend } from '../../services/user.service';
import { MyContext } from '../../types';
import { Environment } from '../../utils/environment';
import { GQLResolvers } from '../graphqlTypes';

export const mutationResolvers: GQLResolvers = {
  Mutation: {
    // User
    registerUser: (_, { user }, ctx) => {
      return userBackend.registerUser(user, ctx);
    },
    loginUser: (_, { user }, ctx) => {
      return userBackend.loginUser(user, ctx);
    },
    logoutUser: (_, __, { req, res }: MyContext) => {
      return new Promise((resolve) =>
        req.session.destroy((err: Error) => {
          res.clearCookie(Environment.cookieName);
          console.log('on logout', err);
          if (err) {
            resolve(false);
            return;
          }
          resolve(true);
        })
      );
    },
    forgotPassword: (_, { userName }, ctx) => {
      return userBackend.forgotPassword(userName, ctx.redis);
    },
    resetPassword: (_, { token, password }, ctx) => {
      return userBackend.resetPassword(token, password, ctx);
    },
    rehydrateUser: (_, __, ctx) => {
      return userBackend.rehydrateUser(ctx);
    },
    // Post
    createPost: (_, { post }, ctx) => {
      if (!ctx.req.session.userId) {
        throw new ApolloError('User not authenticated');
      }
      return postBackend.createPost(ctx.req.session.userId, post);
    },
    deletePost: (_, { id }, ctx) => {
      console.log('id here', id);

      if (!ctx.req.session.userId) {
        throw new ApolloError('User not authenticated');
      }
      return postBackend.deletePost(id);
    },
    // Vote
    vote: (_, { postId, value }, ctx) => {
      if (!ctx.req.session.userId) {
        throw new ApolloError('User not authenticated');
      }
      return updootBackend.vote(ctx.req.session.userId, postId, value);
    }
  }
};
