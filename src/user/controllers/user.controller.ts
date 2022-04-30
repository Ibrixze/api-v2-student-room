import { Body, Controller, Get, Logger, Post, Res } from "@nestjs/common";
import { response } from "express";
import { UserService } from "../services/user.service";



export type UserPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService, private readonly logger: Logger) { }

    @Get('')
    async getUser(@Res() response) {
        const users = await this.userService.getUsers()
        return response.status(200).json(users)
    }


    @Post('')
    async createUser(@Body() payload: UserPayload, @Res() response) {
        const user = await this.userService.createUser(payload)
        if (!user) return this.logger.log('User not created')
        return response.status(200).json({
            message: 'User created',
            user
        })
    }
}