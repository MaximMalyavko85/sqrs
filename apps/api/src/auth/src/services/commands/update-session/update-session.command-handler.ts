import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateSessionCommand } from "./update-session.command";

@CommandHandler(UpdateSessionCommand)
export class UpdateSessionCommandHandler implements ICommandHandler<UpdateSessionCommand, any> {
    constructor(
        //private readonly postRepository: PostRepository
    ) {}
    
    async execute({post}: any): Promise<any> {
        // const postAggregate=  PostAggregate.create(post);

        //authService.generateAccessToken()
        //authService.generateRefreshToken()
        ////authService.validateToken()
        //const _sessionAggregate = SessionAggregate.create(_userAggregate);
        
        return {a: "===>UpdateSessionCommandHandler"}
    }
}