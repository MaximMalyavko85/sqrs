import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthFacade } from './services/auth.facade';
import { CreateUserDto } from 'apps/users/src/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Post('register')
 
  register(@Body() credsDto: CreateUserDto): Promise<any> {
    return this.authFacade.commands.createSession(credsDto);
  }

  @Post('login')
  login(): any {} //Promise<any>

  @Get('refresh')
  refresh(): any {
    return this.authFacade.commands.updateToken({});
  } //Promise<any>

  @Post('logout')
  @Post()
  logout(): any {} //Promise<any>

  @Get('ping')
  ping(): any {} //Promise<any>
}
