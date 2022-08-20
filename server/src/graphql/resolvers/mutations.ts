import { postBackend } from '../../services/post.service';
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
    // Post
    createPost: (_, { post }) => {
      return postBackend.createPost(post);
    },
    deletePost: (_, { id }) => {
      return postBackend.deletePost(id);
    }
  }
};
