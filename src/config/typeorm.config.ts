import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ENV } from "../env/env";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: ENV.host,
    port: ENV.port,
    username: ENV.username,
    password: ENV.password,
    database: ENV.database,
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: false
};