import express, { Application, Response } from 'express';
import { corsOption, startApolloServer } from './config/apollosServer';
import session from 'express-session';
import { createClient } from 'redis';
import { Environment } from './utils/environment';
import cors from 'cors';
import connectRedis from 'connect-redis';

export const startServer = async () => {
  const app: Application = express();
  // middleware
  app.use(cors(corsOption));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // session middleware
  const RedisStore = connectRedis(session);
  const redisClient = createClient({ legacyMode: true });
  redisClient.connect().catch(console.error);

  app.use(
    session({
      name: 'qId',
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60, //  change it to later 1day
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
  const apolloServer = await startApolloServer(app);

  /** Healthcheck */
  app.get('/ping', (_, res: Response) => res.status(200).send('Welcome to lireddit project'));

  app.use('*', (_, res) => {
    res.status(404).send('page not found');
  });

  return { app, apolloServer };
};
