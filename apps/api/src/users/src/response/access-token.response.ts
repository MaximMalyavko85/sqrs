import { ApiProperty } from "@nestjs/swagger";

export class AccessToken {
  @ApiProperty({description: "User Access token", type: 'string'})
  accessToken: string;
}