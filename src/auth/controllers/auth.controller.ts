import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService, UserLogin, UserRegister } from "src/auth/service/auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() payload: UserRegister, @Res() response) {
        const user = await this.authService.register(payload)
        if (!user) return undefined
        return response.status(201).json({
            result: user
        })
    }

    @Post('login')
    async login(@Body() payload: UserLogin, @Res() response) {
        const user = await this.authService.login(payload)
        return response.status(201).json({
            result: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
    }
}