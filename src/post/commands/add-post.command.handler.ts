import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PostEntity } from "../enities/post.entity";
import { PostService } from "../services/post.service";
import { AddPostCommand } from "./add-post.command";


@CommandHandler(AddPostCommand)
export class AddPostCommandHandler implements ICommandHandler<AddPostCommand>{
    constructor(
        private readonly postService: PostService
    ) { }

    async execute(command: AddPostCommand): Promise<any> {

        const { payload, user } = command
        return await this.postService.addPost(payload, user)
    }
}