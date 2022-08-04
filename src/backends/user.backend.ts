import { User } from "../entities/User.entity";
import { GQLUserInput } from "../graphql/graphqlTypes";

const signUpUser = async (user: GQLUserInput) => {
	console.log("check the user input", user);

	return true;
};

export const userBackend = { signUpUser };
