import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import {v4 as uuidv4} from 'uuid';

export class CreateSessionDto {
  @IsUUID()
  _id?: string = uuidv4();

  @IsString()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}