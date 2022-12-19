import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { schema } from '../graphql';
import { MyContext } from '../types';
import Redis from 'ioredis';

export const startApolloServer = async (app: Application, redis: Redis) => {
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }: MyContext) => {
      return { req, res, redis };
    }
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: '/graphql'
  });

  return apolloServer;
};
