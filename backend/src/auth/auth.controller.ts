import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export class RegisterDto {
  name: string;
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    const { name, email, password } = body;
    return this.authService.register(name, email, password);
  }

  @Post('login')
  login(@Body() body: RegisterDto) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}
