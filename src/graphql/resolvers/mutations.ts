import { postBackend } from '../../services/post.service';
import { userBackend } from '../../services/user.service';
import { GQLResolvers } from '../graphqlTypes';

export const mutationResolvers: GQLResolvers = {
  Mutation: {
    // User
    registerUser: (_, { user }) => {
      return userBackend.registerUser(user);
    },
    loginUser: (_, { user }, ctx) => {
      return userBackend.loginUser(user, ctx);
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
