import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guard";
import { PostService } from "../services/post.service";


export type CreatePost = {

}

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) { }

    @Post('add')
    @UseGuards(JwtAuthGuard)
    async createPost(@Body() payload, @Req() request, @Res() response) {
        const user = request.user
        const post = await this.postService.addPost(payload, user)
        return response.status(201).json({
            message: 'Post created !',
            post
        })
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getPost(@Param('id') id: string, @Req() request, @Res() response) {
        const post = await this.postService.getPost(id)
        return response.status(201).json(post)
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    async getPosts(@Req() request, @Res() response) {
        const posts = await this.postService.getPosts()
        return response.status(201).json(posts)
    }

    @Get('user/specifics-post')
    @UseGuards(JwtAuthGuard)
    async getUserPosts(@Req() request, @Res() response) {
        const userId = request.user
        const posts = await this.postService.getPostsByUserId(userId)
        return response.status(201).json(posts)
    }

}