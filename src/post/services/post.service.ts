import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CategoryEntity, CategoryEnum } from "../enities/category.entity";
import { PostEntity } from "../enities/post.entity";

export type CreatePost = {
    numberOfRooms: number;
    price: number;
    address: string;
    category: string
}
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,

    ) { }

    async addPost(payload: CreatePost, userId: string): Promise<PostEntity | undefined> {
        const user = await this.userRepository.findOneBy({ id: userId })
        const category = await this.categoryRepository.findOneBy({ designation: this.getCategoryEnum(payload.category) })
        const post: PostEntity = await this.postRepository.save({
            numberOfRooms: payload.numberOfRooms,
            price: payload.price,
            address: payload.address,
            category,
            user,
        })

        return post
    }

    async getPosts(): Promise<PostEntity[] | undefined> {
        const posts = await this.postRepository.find()
        return posts
    }


    async getPost(id: string): Promise<PostEntity | undefined> {
        const post: PostEntity = await this.postRepository.findOneBy({ id })
        return post
    }


    async getPostsByUserId(userId: string): Promise<PostEntity | PostEntity[] | undefined> {
        const posts = await this.postRepository.findOneBy({
            user: {
                id: userId
            }
        })
        return posts
    }

    private getCategoryEnum(category: string) {
        if (category === 'appartement') {
            return CategoryEnum.APPARTEMENT
        } else if (category === 'villa') {
            return CategoryEnum.VILLA
        } else if (category === 'duplex') {
            return CategoryEnum.DUPLEX
        } else {
            return undefined
        }
    }
}