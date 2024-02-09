import { ERoles, IUser } from "@users/domain";
import { EGender } from "@users/domain/gender.enum";
import { IUserBase } from "@users/domain";

export class UserResponse implements IUserBase, IUser{
  id: string;
  email: string;
  firstName: string;
  userName: string;
  password: string;
  lastName: string;
  role: ERoles;
  gender: EGender;
}