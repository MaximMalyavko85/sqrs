import { CreateUserCommandHandler } from "./create-user";
import { DeleteUserCommandHandler } from "./delete-user";
import { LoginCommandHandler } from "./login-user/login-user.command-handler";
import { LogoutUserCommandHandler } from "./logout-user";
import { UpdateAuthDataCommandHandler } from "./update-auth-data";
import { UpdateUserCommandHandler } from "./update-user";

export * from './create-user';
export * from './delete-user';
export * from './login-user';
export * from './logout-user';
export * from './update-auth-data';
export * from './update-user';

export const USER_COMMAND_HANDLERS = [
  LoginCommandHandler,
  LogoutUserCommandHandler,
  CreateUserCommandHandler,
  UpdateAuthDataCommandHandler,
  UpdateUserCommandHandler,
  DeleteUserCommandHandler,
]

