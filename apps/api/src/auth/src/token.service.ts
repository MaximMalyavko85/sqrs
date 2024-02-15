import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FullUserDto } from "@users/dto/full-user.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ){}

  public async generateAccessToken(userDto: Pick<FullUserDto, 'id'|'email'|'role'>){
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

  public async generateRefreshToken(userDto: FullUserDto){
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

  

  public validateAccesToken(){}
  public validateRefreshToken(){}
}