import { SessionAggregate } from "@auth/domain";
import { IUserAuth } from "@users/domain";
import { TokenService } from "@auth/token.service";
import { SessionRepository } from "@auth/providers";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateAuthDataCommand } from "./update-auth-data.command";


@CommandHandler(UpdateAuthDataCommand)
export class UpdateAuthDataCommandHandler implements ICommandHandler<UpdateAuthDataCommand, Pick<IUserAuth, 'accessToken'| 'refreshToken'>> {

  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly tokenService: TokenService,
  ){}
  
  async execute({sessionUser}: UpdateAuthDataCommand): Promise<Pick<IUserAuth, 'accessToken'| 'refreshToken' >> {
    const accessToken: string = await this.tokenService.generateAccessToken({
      id: sessionUser.userId,
      ...sessionUser
    });

    const refreshToken: string = await this.tokenService.generateRefreshToken({
      id: sessionUser.userId,
      ...sessionUser
    });

    const sessionAgregate = SessionAggregate.create({userId: sessionUser.userId, refreshToken});
    await this.sessionRepository.save(sessionAgregate);

    return {
      refreshToken,
      accessToken
    }
  }
}