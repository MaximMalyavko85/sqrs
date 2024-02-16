import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LogoutUserCommand } from "./logout-user.command";
import { SessionRepository } from "@auth/providers";

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