import express, { Application, Response } from "express";
import { startApolloServer } from "./config/apollosServer";

export const startServer = async () => {
	const app: Application = express();
	// parsing Middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// setting up apollo-server
	const apolloServer = await startApolloServer(app);

	/** Healthcheck */
	app.get("/ping", (_, res: Response) => res.status(200).send("Welcome to lireddit project"));

	app.use("*", (_, res) => {
		res.status(404).send("page not found");
	});

	return { app, apolloServer };
};
