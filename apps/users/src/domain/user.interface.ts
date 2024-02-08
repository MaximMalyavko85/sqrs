import { EGender } from "./gender.enum";
import { ERoles } from "./roles.enum";

export interface IUser {
  email: string;
  firstName: string,
  userName: string;
  password: string;
  lastName: string;
  role: ERoles;
  gender: EGender;
}