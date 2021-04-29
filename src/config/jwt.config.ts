import { JwtModuleOptions } from "@nestjs/jwt";
import { ENV } from "src/env/env";

export const jwtConfig: JwtModuleOptions = {
    secret: ENV.secret,
    signOptions: {
        expiresIn: ENV.expire_in,
        algorithm: 'HS256'
    },
};