import { IUserBase } from "./user-base.interface";
import { IUser } from "./user.interface";

export interface IUserAuth extends IUserBase, IUser{
  accessToken: string;
  refreshToken: string;
}