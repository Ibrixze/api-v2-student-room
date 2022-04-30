import { Body, Controller, Post, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService, UserLogin, UserRegister } from "src/auth/service/auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
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
        const jwt = this.jwtService.sign({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        })
        return response.status(201).json({
            result: {
                acessToken: jwt
            }
        })
    }
}