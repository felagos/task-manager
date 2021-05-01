import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtConfig } from "../config/jwt.config";
import { AuthController } from "./controllers/auth/auth.controller";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { UserRepository } from "./repository/user.repository";
import { AuthService } from "./services/auth/auth.service";
import { EncryptService } from "./services/encrypt/encrypt.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([UserRepository]),
		JwtModule.register(jwtConfig),
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [AuthController],
	providers: [AuthService, EncryptService, JwtStrategy],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
