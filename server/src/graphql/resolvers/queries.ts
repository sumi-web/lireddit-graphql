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
    getPost: (_, { id }) => {
      return postBackend.getPost(id);
    },
    getAllPost: (_, { limit, cursor }) => {
      return postBackend.getAllPost(limit, cursor);
    }
  }
};
