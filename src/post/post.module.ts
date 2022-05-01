import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { PostController } from "./controllers/post.comtroller";
import { CategoryEntity } from "./enities/category.entity";
import { PostEntity } from "./enities/post.entity";
import { PostService } from "./services/post.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity, CategoryEntity, UserEntity])
    ],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule { }