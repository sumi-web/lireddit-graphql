import { DataSource } from "typeorm";
import { Post } from "../entities/Post";

export const Database = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "1234",
	database: "lireddit",
	synchronize: true,
	logging: true,
	entities: [Post],
	subscribers: [],
	migrations: [],
});
