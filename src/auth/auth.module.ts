import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { UserService } from "src/user/services/user.service";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./service/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    providers: [UserService, AuthService, Logger]
})
export class AuthModule { }