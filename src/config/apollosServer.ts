import { Application } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { resolvers } from "../graphql";
import http from "http";

const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	# This "Book" type defines the queryable fields for every book in our data source.
	type Query {
		healthCheck: String
	}
`;

export const startApolloServer = async (app: Application) => {
	const httpServer = http.createServer(app);
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		csrfPrevention: true,
		cache: "bounded",
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await apolloServer.start();
	apolloServer.applyMiddleware({
		app,
		path: "/graphql",
	});

	return apolloServer;
};
