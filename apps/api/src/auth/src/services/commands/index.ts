import { CreateSessionCommandHandler } from "./create-session/create-session.command-handler";
import { UpdateSessionCommandHandler } from "./update-session/update-session.command-handler";

export const AUTH_COMMAND_HANDLERS = [
  CreateSessionCommandHandler,
  UpdateSessionCommandHandler
]