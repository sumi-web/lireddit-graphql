import dotenv from "dotenv";
dotenv.config();

export class Environment {
	public static isProd: boolean = process.env.NODE_ENV === "production";
	public static port: string = process.env.PORT || "5000";
	public static dbName: string = process.env.DB_NAME || "";
	public static dbUserName: string = process.env.DB_USER_NAME || "postgres";
	public static dbPassword: string = process.env.DB_PASSWORD || "";
}
