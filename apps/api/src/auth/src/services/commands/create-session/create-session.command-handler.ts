import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSessionCommand } from "./create-session.command";
import { SessionAggregate } from "../../../domain/session.aggregate";
import { IUser, UserAggregate } from "apps/users/src/domain";
import { UserRepository } from "apps/users/src/providers/user.repository";
import { BadRequestException } from "@nestjs/common";


// this decorator defines a handler that will be called on command CreateTokenCommand
// this is reducers
@CommandHandler(CreateSessionCommand) 
export class CreateSessionCommandHandler implements ICommandHandler<CreateSessionCommand, SessionAggregate> {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    
    async execute({ session: user } : CreateSessionCommand): Promise<any> {
        const _userAggregate: IUser = UserAggregate.create(user);
        
        const _createdUser = this.userRepository
        .save(_userAggregate)
        .catch(err => {
            throw new BadRequestException(err);
        });

        //authService.generateAccessToken()
        //authService.generateRefreshToken()
        ////authService.validateToken()
        const _sessionAggregate = SessionAggregate.create(_userAggregate);

        // const createdPost = await this.postRepository
        // .save(postAggregate)
        // .catch(err => {
        //     throw new BadRequestException(err);
        // });

        console.log(_userAggregate)
        console.log(_sessionAggregate)

        //return postAggregate;
        return {a: "===>, CreateSessionCommandHandler"}
    }
}