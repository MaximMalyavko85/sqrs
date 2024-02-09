import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthFacade } from './services/auth.facade';
import { CreateUserDto, LoginUserDto } from '@users/dto';
import { UserFacade } from '@users/services/user.facade';
import { UserResponse } from '@users/response';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserAggregate } from '@users/domain';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly userFacade: UserFacade
  ) {}

  @Post('register')
  @ApiOkResponse({type: UserResponse})
  egister(@Body() registerUserDto: CreateUserDto): Promise<any> {
    return this.userFacade.commands.createUser(registerUserDto);
  }

  @Post('login')
  //@ApiOkResponse({type: UserResponse})
  login(@Body() loginUserDto: LoginUserDto): Promise<any> {

    // const domenPath: string = "/api/v1/auth";

    //     response.cookie('jwt', tokens.refreshToken, {
    //         httpOnly: true,
    //         path: domenPath,
    //         domain: this.configService.get<string>("JWT_DOMEN"),
    //         maxAge: this.configService.get<number>('JWT_REFRESH_EXPIRE_COOKIES'),
    //     });

    return this.userFacade.commands.loginUser(loginUserDto);
  }

  @Get('refresh')
  refresh(): any {
    //return this.authFacade.commands.updateToken({});
  } //Promise<any>

  @Post('logout')
  @Post()
  logout(): any {} //Promise<any>

  @Get('ping')
  ping(): any {} //Promise<any>
}
