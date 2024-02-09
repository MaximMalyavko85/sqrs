import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserDto } from "apps/users/src/dto";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ){}

  private generateAccessToken(userDto: UserDto){
    return this.jwtService.signAsync(
      {
        userId: userDto.id,
        email: userDto.email,
        role: userDto.role,
      },
      {
        secret    : this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn : this.configService.get<string>('JWT_ACCESS_EXPIRE'),
      },
    )
  }

  private generateRefreshToken(userDto: UserDto){
    return this.jwtService.signAsync(
      {
        userId: userDto.id,
        email: userDto.email,
        role: userDto.role,
      },
      {
        secret    : this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn : this.configService.get<string>('JWT_REFRESH_EXPIRE'),
      },
    )
  }

  private validateAccesToken(){}
  private validateRefreshToken(){}
}