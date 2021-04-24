import { Controller } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

}
