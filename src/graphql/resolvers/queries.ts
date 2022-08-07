import { postBackend } from '../../services/post.service';
import { GQLResolvers } from '../graphqlTypes';

export const queryResolvers: GQLResolvers = {
  Query: {
    healthCheck: () => 'Welcome to lireddit',

    // Post
    getPost: (_, { id }) => {
      return postBackend.getPost(id);
    },
    getAllPost: () => {
      return postBackend.getAllPost();
    }
  }
};
