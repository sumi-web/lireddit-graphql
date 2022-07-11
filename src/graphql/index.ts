import { Resolvers } from "./generated";
import { loadFilesSync } from "@graphql-tools/load-files";
import { queryResolvers } from "./resolvers/queries";

const resolvers: Resolvers = { ...queryResolvers };

// getting all gql files in array<DocumentNode>
const typeDefs = loadFilesSync("src/graphql/**/*.gql");

export { typeDefs, resolvers };
