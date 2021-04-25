import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post("/signup")
    signUp(@Body(ValidationPipe) body: AuthCredentialsDto) {
        return this.authService.signUp(body);
    }

}
