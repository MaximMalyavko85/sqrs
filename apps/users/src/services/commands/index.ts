import { CreateUserCommandHandler } from "./create-user";
import { LoginCommandHandler } from "./login-user/login-user.command-handler";
import { LogoutUserCommandHandler } from "./logout-user";

export const USER_COMMAND_HANDLERS = [
  LoginCommandHandler,
  LogoutUserCommandHandler,
  CreateUserCommandHandler,
]