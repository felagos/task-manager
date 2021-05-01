import { config } from "dotenv";

config({ path: ".env" });

export const ENV = {
	host: process.env.HOST,
	port: +process.env.PORT,
	username: process.env.USER_BD,
	password: process.env.PASSWORD,
	database: process.env.DATA_BASE,
	secret: process.env.JWT_SECRET,
	expire_in: process.env.EXPIRE_IN,
};
