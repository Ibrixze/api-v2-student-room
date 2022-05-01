import { PostEntity } from "src/post/enities/post.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        select: false
    })
    password: string

    @OneToMany(type => PostEntity, post => post.user, {
        cascade: true,
        nullable: true
    })
    @JoinColumn()
    posts: PostEntity[]

}