import { SessionRepository } from "@auth/providers";
import { LogoutUserCommand } from "./logout-user.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(LogoutUserCommand)
export class LogoutUserCommandHandler implements ICommandHandler<Number, Boolean> {
  constructor(
    private readonly sessionRepository: SessionRepository,
  ){}
  execute(userId: number): Promise<boolean> {
    this.sessionRepository.delete(userId);
    return
  }
}