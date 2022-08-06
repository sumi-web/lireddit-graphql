import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { schema } from '../graphql';

export const startApolloServer = async (app: Application) => {
    const httpServer = http.createServer(app);
    const apolloServer = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        path: '/graphql'
    });

    return apolloServer;
};
