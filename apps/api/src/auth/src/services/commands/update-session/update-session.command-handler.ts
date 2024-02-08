import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateSessionCommand } from "./update-session.command";

@CommandHandler(UpdateSessionCommand)
export class UpdateSessionCommandHandler implements ICommandHandler<UpdateSessionCommand, any> {
    constructor(
        //private readonly postRepository: PostRepository
    ) {}
    
    async execute({post}: any): Promise<any> {
        // const postAggregate=  PostAggregate.create(post);


        // const createdPost = await this.postRepository
        // .save(postAggregate)
        // .catch(err => {
        //     throw new BadRequestException(err);
        // });

        //return postAggregate;
        return {a: "===>UpdateSessionCommandHandler"}
    }
}