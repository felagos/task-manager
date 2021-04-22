import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

config({ path: ".env" });

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.HOST,
    port: +process.env.PORT,
    username: process.env.USER_BD,
    password: process.env.PASSWORD,
    database: process.env.DATA_BASE,
    entities: [__dirname + "/../**/*.entity.ts"],
    synchronize: false
};