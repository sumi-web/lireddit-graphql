import { postBackend } from '../../backends/post.backend';
import { userBackend } from '../../backends/user.backend';
import { GQLResolvers } from '../graphqlTypes';

export const mutationResolvers: GQLResolvers = {
  Mutation: {
    // User
    registerUser: (_, { user }) => {
      return userBackend.registerUser(user);
    },
    loginUser: (_, { user }) => {
      return userBackend.loginUser(user);
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
