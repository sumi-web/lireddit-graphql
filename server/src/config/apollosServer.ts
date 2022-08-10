import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { schema } from '../graphql';
import { MyContext } from '../types';

export const startApolloServer = async (app: Application) => {
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }: MyContext) => ({ req })
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: '/graphql'
  });

  return apolloServer;
};
