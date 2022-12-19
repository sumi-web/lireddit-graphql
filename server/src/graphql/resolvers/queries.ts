import { postBackend } from '../../services/post.service';
import { userBackend } from '../../services/user.service';
import { GQLResolvers } from '../graphqlTypes';

export const queryResolvers: GQLResolvers = {
  // field resolvers
  User: {
    email: (user, _, { req }) => {
      //  this is the current user and its ok to show them their own email
      if (user.id === req.session.userId) {
        return user.email;
      }
      // current user want to see someone else mail
      return '';
    }
  },

  Query: {
    healthCheck: () => 'Welcome to lireddit',
    // User
    getAllUsers: () => {
      return userBackend.getAllUsers();
    },
    // Post
    getPost: (_, { id }) => {
      return postBackend.getPost(id);
    },
    getAllPost: (_, { limit, cursor }, ctx) => {
      const sessionId = ctx.req.session?.userId;

      return postBackend.getAllPost(sessionId, limit, cursor);
    }
  }
};
