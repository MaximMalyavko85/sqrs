import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '@users/dto';
import { UserFacade } from '@users/services/user.facade';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshGuard, JwtAccessGuard } from './guards';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessToken, UserResponse } from '@users/response';
import { UserLoginResponse } from '@users/response/user-login.response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userFacade   : UserFacade,
    private readonly configService: ConfigService
  ) {}

  @ApiTags('AUTH')
  @ApiOperation({summary: 'Register user'})
  @ApiOkResponse({type: UserResponse, status: HttpStatus.OK})
  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() registerUserDto: CreateUserDto) {
    return this.userFacade.commands.createUser(registerUserDto);
  }

  @ApiTags('AUTH')
  @ApiOperation({summary: 'Login user'})
  @ApiOkResponse({type: UserLoginResponse, status: HttpStatus.OK})
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: any,
  ){
    const {refreshToken, accessToken, ...user} = await this.userFacade.commands.loginUser(loginUserDto) as any;
    const domenPath: string = "/api/v1/auth";

    response.cookie('jwt', refreshToken, {
        httpOnly: true,
        path    : domenPath,
        domain  : this.configService.get<string>("JWT_DOMEN"),
        maxAge  : this.configService.get<number>('JWT_REFRESH_EXPIRE_COOKIES'),
    });

    return {
      user, 
      accessToken
    };
  }

  @ApiTags('AUTH')
  @ApiOperation({summary: 'Refresh tokens'})
  @ApiOkResponse({type: AccessToken, status: HttpStatus.OK})
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(
    @Req() request, 
    @Res({ passthrough: true }) response,
  ) {
    const { session} = request;
    const {refreshToken, accessToken} = await this.userFacade.commands.refreshUserData(session) as any;

    const domenPath: string = "/api/v1/auth";

    response.cookie('jwt', refreshToken, {
      httpOnly: true,
      path    : domenPath,
      domain  : this.configService.get<string>("JWT_DOMEN"),
      maxAge  : this.configService.get<number>('JWT_REFRESH_EXPIRE_COOKIES'),
    });

    return {
      accessToken
    };
  }

  @ApiTags('AUTH')
  @ApiOperation({summary: 'Logout user'})
  @ApiOkResponse({type: Boolean, status: HttpStatus.NO_CONTENT})
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAccessGuard)
  async logout(
    @Req() request, 
    @Res({ passthrough: true }) response,
  ){
    const { session} = request;
    const { userId } = session;

    await this.userFacade.commands.logout(userId);

    const domenPath: string = "/api/v1/auth";
   
    response.clearCookie("jwt", {
      path  : domenPath,
      domain: this.configService.get<string>("JWT_DOMEN"),
    });

    return;
  }

  @ApiTags('AUTH')
  @ApiOperation({summary: 'ping/pong (for tests)'})
  @UseGuards(JwtAccessGuard)
  @Get('ping')
  @ApiOkResponse({type: String, status: HttpStatus.NO_CONTENT})
  ping(): string {
    return 'pong';
  } 
}
