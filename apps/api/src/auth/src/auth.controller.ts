import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '@users/dto';
import { UserFacade } from '@users/services/user.facade';
import { ConfigService } from '@nestjs/config';
import { JwtAccessGuard } from './guards/jwt-acces.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly userFacade   : UserFacade,
    private readonly configService: ConfigService
  ) {}

  @Post('register')
  register(@Body() registerUserDto: CreateUserDto) {
    return this.userFacade.commands.createUser(registerUserDto);
  }

  @Post('login')
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

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(
    @Req() request, 
    @Res({ passthrough: true }) response,
  ): any {
    const { session} = request;
    const { userId } = session;

    console.log(session)

    // generate new pair and save to cookies files refreshToken
    // return accesToken 

    //return this.authFacade.commands.updateToken({});

    // const domenPath: string = "/api/v1/auth";

    // response.cookie('jwt', tokens.refreshToken, {
    //     httpOnly: true,
    //     path: domenPath,
    //     domain: this.configService.get<string>("JWT_DOMEN"),
    //     maxAge: this.configService.get<number>('JWT_REFRESH_EXPIRE_COOKIES'),
    // });
    // return {
    //     user, 
    //     accessToken: tokens.accessToken,
    // };
  } //Promise<any>

  @Post('logout')
  @HttpCode(204)
  @UseGuards(JwtAccessGuard)
  logout(
    @Req() request, 
    @Res({ passthrough: true }) response,
  ){
    const { session} = request;
    const { userId } = session;
    const domenPath: string = "/api/v1/auth";
   
    this.userFacade.commands.logout(userId);

    response.clearCookie("jwt", {
      path  : domenPath,
      domain: this.configService.get<string>("JWT_DOMEN"),
    });

    return;
  }

  @Get('ping')
  ping(): any {} //Promise<any>
}
