import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialSalt, AuthCredentialsDto } from '../../dto/auth-credentials.dto';
import { UserRepository } from '../../repository/user.repository';
import { JwtPayload } from '../../../models/payload.model';
import { EncryptService } from '../encrypt/encrypt.service';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository, private encryptService: EncryptService, private jwtService: JwtService) { }

    async signUp(credentials: AuthCredentialsDto): Promise<void> {
        const salt = await this.encryptService.generateSalt();
        const password = await this.encryptService.hashPassword(credentials.password, salt);

        const credentialSalt: AuthCredentialSalt = { ...credentials, password, salt };

        return await this.userRepository.singUp(credentialSalt);
    }

    private async validatePassword(credentials: AuthCredentialsDto): Promise<boolean> {
        const { username, password } = credentials;
        const user = await this.userRepository.findOne({ username });

        if(!user) throw new NotFoundException(`Username ${username} not found`);

        return await this.encryptService.validatePassword(password, user.password, user.salt);
    }

    async signIn(credentials: AuthCredentialsDto) {
        const isValidPassword = await this.validatePassword(credentials);

        if(!isValidPassword) throw new UnauthorizedException("Invalid credentials");

        const payload: JwtPayload = {username: credentials.username};
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }


}
