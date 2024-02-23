import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FullUserDto } from "@users/dto/full-user.dto";
import { IUserSessian } from "./domain/interfaces";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  public async generateAccessToken(userDto: Pick<FullUserDto, 'id' | 'email' | 'role'>) {
    return this.jwtService.signAsync(
      {
        userId: userDto.id,
        email: userDto.email,
        role: userDto.role,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE'),
      },
    )
  }

  public async generateRefreshToken(userDto: Pick<FullUserDto, 'id' | 'email' | 'role'>) {
    return this.jwtService.signAsync(
      {
        userId: userDto.id,
        email: userDto.email,
        role: userDto.role,
      },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
      },
    )
  }

  public async validateAccesToken(token: string): Promise<IUserSessian> {
    try{
    const userData = await this.jwtService.verifyAsync(
        token,
        { secret: this.configService.get<string>('JWT_ACCESS_SECRET') }
      );

      return userData;
    } catch(e){
      throw new BadRequestException("Token not valid.");
    }
  }

  public async validateRefreshToken(token:string): Promise<IUserSessian> {
    try{ 
      const userData =  await this.jwtService.verifyAsync(
        token,
        { secret: this.configService.get<string>('JWT_REFRESH_SECRET') }
      );

      return userData;
    } catch(e){
      throw new BadRequestException("Token not valid.");
    }
   }
}