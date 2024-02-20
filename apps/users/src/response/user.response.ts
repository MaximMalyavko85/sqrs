import { ERoles } from "@users/domain";
import { EGender } from "@users/domain/gender.enum";
import { IUserBase } from "@users/domain";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserResponse implements IUserBase {
  @ApiProperty({description: "User ID", type: 'number', example: 7})
  id: number;

  @ApiProperty({description: "User email", type: 'string'})
  email: string;

  @ApiProperty({description: "User first name", type: 'string'})
  firstName: string;

  @ApiProperty({description: "User last name", type: 'string'})
  lastName: string;

  @ApiProperty({description: "User user name", type: 'string', example: "jonson@gmail.com"})
  userName: string;

  @ApiPropertyOptional({description: "User role", enum: ERoles, default: ERoles.user})
  role: ERoles;

  @ApiPropertyOptional({description: "User role", enum: EGender})
  gender: EGender;
}