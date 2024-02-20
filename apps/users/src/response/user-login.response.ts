import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ERoles, IUserBase } from "@users/domain";
import { UserResponse } from "./user.response";
import { AccessToken } from "./access-token.response";


export class UserLoginResponse {
  @ApiProperty({description: "User data", type: UserResponse})
  user: UserResponse;

  @ApiProperty({description: "User Access token", type: AccessToken})
  accessToken: AccessToken;
}