import { ERoles } from "@users/domain";

export interface IUserSessian {
  userId: number,
  email : string,
  role  : ERoles,
}