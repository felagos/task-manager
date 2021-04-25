import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { UserRepository } from 'src/auth/repository/user.repository';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) { }

    signUp(credentials: AuthCredentialsDto): Promise<void> {
        return this.userRepository.singUp(credentials);
    }


}
