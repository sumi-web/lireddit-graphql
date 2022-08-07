import "reflect-metadata";
import { Environment } from "./utils/environment";
import { startServer } from "./app";
import { Database } from "./config/database";

Database.initialize()
	.then(async () => {
		const { app, apolloServer } = await startServer();
		app.listen(Environment.port, () => {
			console.log(`express server has been started at port ${Environment.port}`);
			console.log(
				`apollo server has been started at ${Environment.port}${apolloServer.graphqlPath}`
			);
		});
	})
	.catch((error) => console.log(error));
