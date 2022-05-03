import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PostService } from "../services/post.service";
import { GetUserPostsQuery } from "./get-user-post.query";

@QueryHandler(GetUserPostsQuery)
export class GetUserPostsQueryHandler implements IQueryHandler<GetUserPostsQuery>{
    constructor(
        private readonly postService: PostService
    ) { }

    async execute(query: GetUserPostsQuery): Promise<any> {
        const { userId } = query
        return await this.postService.getPostsByUserId(userId)
    }
}