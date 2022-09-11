import express, { Application, Response } from 'express';
import { startApolloServer } from './config/apollosServer';
import session from 'express-session';
import { Environment } from './utils/environment';
import cors from 'cors';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';

const corsOption = {
  origin: [
    'http://localhost:3000',
    'https://studio.apollographql.com',
    'https://legacy.graphqlbin.com'
  ],
  credentials: true
};

export const startServer = async () => {
  const app: Application = express();
  // middleware
  app.use(cors(corsOption));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // session middleware
  const redis = new Redis();

  const RedisStore = connectRedis(session);

  app.use(
    session({
      name: Environment.cookieName,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 10, //  change it to later 1day
        httpOnly: true,
        sameSite: 'lax',
        secure: Environment.isProd
      },
      saveUninitialized: false,
      secret: Environment.secretKey,
      resave: false
    })
  );

  // setting up apollo-server
  const apolloServer = await startApolloServer(app, redis);

  /** Healthcheck */
  app.get('/ping', (_, res: Response) => res.status(200).send('Welcome to lireddit project'));

  app.use('*', (_, res) => {
    res.status(404).send('page not found');
  });

  return { app, apolloServer };
};
