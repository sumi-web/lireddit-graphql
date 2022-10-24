import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';
import { GQLResolvers } from './graphqlTypes';
import { mutationResolvers } from './resolvers/mutations';
import { queryResolvers } from './resolvers/queries';

const resolvers: GQLResolvers = { ...queryResolvers, ...mutationResolvers };

// getting all gql files in array<DocumentNode>
const typeDefs = loadFilesSync(path.join(__dirname + '/../../src/graphql/**/*.gql'));

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
