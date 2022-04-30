import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserService } from "src/user/services/user.service";

export type UserRegister = {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

export type UserLogin = {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly logger: Logger,
        @InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>
    ) { }

    async register(payload: UserRegister): Promise<any | undefined> {

        try {
            const { firstName, lastName, email, password } = payload
            const userExist = await this.repository.findOne({
                where: { email: email }
            });
            if (userExist) {
                this.logger.log('User is already exist')
                return {
                    message: 'User is already exsit'
                }
            }
            const hashPassword = await bcrypt.hash(password, 15)
            const user = await this.userService.createUser({
                firstName,
                lastName,
                password: hashPassword,
                email
            })
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        } catch (error) {
            this.logger.log('User not created ')
        }
    }

    async login(payload: UserLogin): Promise<any | undefined> {
        try {
            const { email, password } = payload
            const user = await this.repository.findOne({
                where: { email: email }
            })

            if (!user) {
                this.logger.log('User not exist')
                return {
                    message: 'User not exist'
                }
            }

            const verifyPassword = await bcrypt.compare(password, user.password)
            if (!verifyPassword) {
                this.logger.log('Invalid credentials')
                return {
                    messsage: 'Invalid credentials'
                }
            }

            return user
        } catch (error) {
            this.logger.log(error)
            return undefined
        }
    }
}