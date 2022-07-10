import dotenv from "dotenv";
dotenv.config();

export class Environment {
	public static isProd: boolean = process.env.NODE_ENV === "production";
	public static port: string = process.env.PORT || "5000";
}
