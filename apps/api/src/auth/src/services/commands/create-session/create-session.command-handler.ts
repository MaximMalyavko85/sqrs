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
        const _userAggregate: UserAggregate = UserAggregate.create(user);
        
        const _userExist = await this.userRepository
        .findOneWhere({email: _userAggregate.email})
        .catch(err => {
            throw new BadRequestException(err);
        });
        
        if (_userExist) throw new BadRequestException('User with this email already exist.');
        
        await _userAggregate.hashPassword();
        const _createdUser = await this.userRepository
            .save(_userAggregate)
            .catch(err => {
                throw new BadRequestException(err);
            });

        _createdUser.removePassword();
                
        return _createdUser;
    }
}