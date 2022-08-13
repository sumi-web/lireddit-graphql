import React from 'react';
import { withUrqlClient } from 'next-urql';
import { dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { RehydrateUserDocument } from '../graphql/graphqlHooks';

export const withUrql = (component: React.FC, ssr = false) => {
  return withUrqlClient(
    (ssrExchange) => ({
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
        ssrExchange,
        fetchExchange
      ]
    }),
    { ssr }
  )(component);
};
