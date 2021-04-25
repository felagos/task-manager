import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { DatabaseError } from "src/enums/database-error.enum";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async singUp(credentials: AuthCredentialsDto): Promise<void> {
        const { username, password } = credentials;

        const user = new User();
        user.username = username;
        user.password = password;
        try {
            await user.save();
        } catch (error) {
            if (error.code === DatabaseError.DUPLICATED) throw new ConflictException("Username already exists");
            else throw new InternalServerErrorException();
        }
    }

}