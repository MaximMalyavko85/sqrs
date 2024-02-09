import { CreateUserCommandHandler } from "./create-user";
import { LoginCommandHandler } from "./login-user/login-user.command-handler";

export const USER_COMMAND_HANDLERS = [
  CreateUserCommandHandler,
  LoginCommandHandler
]