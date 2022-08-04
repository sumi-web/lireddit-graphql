import { userBackend } from "../../backends/user.backend";
import { GQLResolvers } from "../graphqlTypes";

export const mutationResolvers: GQLResolvers = {
	Mutation: {
		signUpUser: (_, { user }) => {
			return userBackend.signUpUser(user);
		},
	},
};
