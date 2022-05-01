import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";

export enum CategoryEnum {
    APPARTEMENT = 'appartement',
    VILLA = 'villa',
    DUPLEX = 'duplex'
}

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: CategoryEnum,
        default: [CategoryEnum.APPARTEMENT]
    })
    designation: CategoryEnum

    @OneToMany(type => PostEntity, post => post.category)
    @JoinColumn()
    posts: PostEntity[]
}