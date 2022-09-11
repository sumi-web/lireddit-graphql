import React, { useEffect, useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { RehydrateUserDocument, useRehydrateUserMutation } from '../graphql/graphqlHooks';
import Wrapper from '../components/Wrapper';
import FullScreenLoader from '../components/FullScreenLoader';
import { useRouter } from 'next/router';
import { useUser } from '../context/useUser';
import { pipe, tap } from 'wonka';
import { Exchange } from 'urql';
import Router from 'next/router';

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        // If the OperationResult has an error send a request to sentry
        if (error) {
          // the error is a CombinedError with networkError and graphqlErrors properties
          if (error.message.includes('User not authenticated')) {
            Router.replace('/login');
          }
        }
      })
    );
  };

export const withUrql = (Component: React.FC, ssr = false) => {
  const Authenticated = (props: any) => {
    // STATE
    const [isLoading, setIsLoading] = useState(true);
    // HOOKS
    const userCtx = useUser();
    const router = useRouter();
    const [_, getUser] = useRehydrateUserMutation();

    const routesWithoutAuth = () => {
      return (
        router.pathname === '/login' ||
        router.pathname === '/forgot-password' ||
        router.pathname === '/register'
      );
    };

    const gotoLocation = () => {
      if (routesWithoutAuth()) {
        setIsLoading(false);
      } else {
        const goTo = router.asPath;
        localStorage.setItem('goTo', goTo);
        router.replace('/login');
      }
    };

    useEffect(() => {
      if (!userCtx?.user) {
        getUser()
          .then(({ data }) => {
            if (data && data.user) {
              userCtx?.setUser(data.user);
              if (routesWithoutAuth()) router.replace('/');
              setIsLoading(false);
            } else {
              gotoLocation();
            }
          })
          .catch(() => {
            const goTo = router.asPath;
            localStorage.setItem('goTo', goTo);
            router.replace('/login');
          });
      } else if (userCtx.user) {
        setIsLoading(false);
      }
    }, []);

    return isLoading ? (
      <Wrapper>
        <FullScreenLoader />
      </Wrapper>
    ) : (
      <Component {...props} />
    );
  };

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
        errorExchange,
        ssrExchange,
        fetchExchange
      ]
    }),
    { ssr }
  )(Authenticated);
};
