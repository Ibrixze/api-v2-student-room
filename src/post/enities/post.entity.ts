import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";

@Entity('post')
export class PostEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    numberOfRooms: number;

    @Column()
    address: string

    @Column()
    price: number

    @ManyToOne(type => UserEntity, user => user.posts, {
        nullable: true,
        eager: true
    })
    user: UserEntity

    @ManyToOne(type => CategoryEntity, category => category.posts, {
        nullable: true,
        eager: true
    })
    @JoinColumn()
    category: CategoryEntity
}