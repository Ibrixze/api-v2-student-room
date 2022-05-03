import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guard";
import { AddPostCommand } from "../commands/add-post.command";
import { GetPostQuery } from "../queries/get-post.query";
import { GetPostsQuery } from "../queries/get-posts.query";
import { GetUserPostsQuery } from "../queries/get-user-post.query";
import { PostService } from "../services/post.service";


export type CreatePost = {

}

@Controller('post')
export class PostController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post('add')
    @UseGuards(JwtAuthGuard)
    async createPost(@Body() payload, @Req() request, @Res() response) {
        const user = request.user
        const post = await this.commandBus.execute(new AddPostCommand(payload, user))
        return response.status(201).json({
            message: 'Post created !',
            post
        })
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getPost(@Param('id') id: string, @Req() request, @Res() response) {
        const post = await this.queryBus.execute(new GetPostQuery(id))
        return response.status(201).json(post)
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    async getPosts(@Req() request, @Res() response) {
        const posts = await this.queryBus.execute(new GetPostsQuery())
        return response.status(201).json(posts)
    }

    @Get('user/specifics-post')
    @UseGuards(JwtAuthGuard)
    async getUserPosts(@Req() request, @Res() response) {
        const userId = request.user
        const posts = await this.queryBus.execute(new GetUserPostsQuery(userId))
        return response.status(201).json(posts)
    }

}