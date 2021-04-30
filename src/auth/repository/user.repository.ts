import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { DatabaseError } from "../../enums/database-error.enum";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialSalt } from "../dto/auth-credentials.dto";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async singUp(credentials: AuthCredentialSalt): Promise<void> {
        const { username, password, salt } = credentials;

        const user: User = new User();
        user.username = username;
        user.password = password;
        user.salt = salt;

        try {
            await user.save();
        } catch (error) {
            if (error.code === DatabaseError.DUPLICATED) throw new ConflictException("Username already exists");
            else throw new InternalServerErrorException();
        }
    }

}