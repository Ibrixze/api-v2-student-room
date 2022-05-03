import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { CommandHandlers } from "./commands";
import { PostController } from "./controllers/post.comtroller";
import { CategoryEntity } from "./enities/category.entity";
import { PostEntity } from "./enities/post.entity";
import { QueryHandlers } from "./queries";
import { PostService } from "./services/post.service";


@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([PostEntity, CategoryEntity, UserEntity])
    ],
    controllers: [PostController],
    providers: [
        ...QueryHandlers,
        ...CommandHandlers,
        PostService
    ]
})
export class PostModule { }