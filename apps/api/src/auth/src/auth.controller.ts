import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(): any {} //Promise<any>

  @Post('login')
  login(): any {} //Promise<any>

  @Get('refresh')
  refresh(): any {} //Promise<any>

  @Post('logout')
  @Post()
  logout(): any {} //Promise<any>

  @Get('ping')
  ping(): any {} //Promise<any>
}
