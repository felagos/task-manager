import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ENV } from "src/env/env";
import { JwtPayload } from "src/models/payload.model";
import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: ENV.secret
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.userRepository.findOne({ username: payload.username });
        if(!user) throw new UnauthorizedException();

        delete user.tasks;

        return user;
    }

}