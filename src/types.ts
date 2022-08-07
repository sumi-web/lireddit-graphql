import { Request, Response } from 'express';

export type MyContext = {
  req: Request & { session: Express.SessionStore & { userId: string } };
  res: Response;
};
