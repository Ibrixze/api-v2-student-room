import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PostService } from "../services/post.service";
import { GetPostQuery } from "./get-post.query";

@QueryHandler(GetPostQuery)
export class GetPostQueryQuerHandler implements IQueryHandler<GetPostQuery>{
    constructor(
        private readonly postService: PostService
    ) { }

    async execute(query: GetPostQuery): Promise<any> {
        const { id } = query
        return await this.postService.getPost(id)
    }
}