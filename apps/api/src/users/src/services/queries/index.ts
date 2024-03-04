import { GetUserQueryHandler } from "./get-user";
import { GetUsersQueryHandler } from "./get-users/get-users.query-handler";

export * from './get-user';
export * from './get-users';

export const QUERYS_HANDLERS = [
  GetUsersQueryHandler,
  GetUserQueryHandler
]