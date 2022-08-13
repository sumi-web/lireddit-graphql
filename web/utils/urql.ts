import { createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { RehydrateUserDocument } from '../graphql/graphqlHooks';

export const client = createClient({
  url: 'http://localhost:5001/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logoutUser: (_result, _args, cache, _info) => {
            // updating the query cache manually
            cache.updateQuery({ query: RehydrateUserDocument }, () => {
              return { user: null, __typename: 'User' };
            });
          }
        }
      }
    }),
    fetchExchange
  ]
});
