import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PostEntity } from "../enities/post.entity";
import { PostService } from "../services/post.service";
import { GetPostsQuery } from "./get-posts.query";

@QueryHandler(GetPostsQuery)
export class GetPostsQueryHandler implements IQueryHandler<GetPostsQuery>{
    constructor(
        private readonly postService: PostService
    ) { }

    async execute(query: GetPostsQuery): Promise<PostEntity[] | undefined> {
        return await this.postService.getPosts()
    }
}