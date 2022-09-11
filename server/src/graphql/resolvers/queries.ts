import { postBackend } from '../../services/post.service';
import { userBackend } from '../../services/user.service';
import { GQLResolvers } from '../graphqlTypes';

export const queryResolvers: GQLResolvers = {
  Query: {
    healthCheck: () => 'Welcome to lireddit',
    // User
    getAllUsers: () => {
      return userBackend.getAllUsers();
    },
    // Post
    getPost: (_, { id }, ctx) => {
      return postBackend.getPost(id);
    },
    getAllPost: () => {
      return postBackend.getAllPost();
    }
  }
};
