import { Logger, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Passport } from "passport";
import { UserEntity } from "src/user/entities/user.entity";
import { UserService } from "src/user/services/user.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./service/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy.passport";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: 's3cr3t',
            signOptions: {
                expiresIn: '72h'
            }
        }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [AuthController],
    providers: [UserService, AuthService, Logger, JwtStrategy]
})
export class AuthModule { }