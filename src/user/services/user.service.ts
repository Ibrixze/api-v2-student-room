import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>, private readonly logger: Logger) { }

    async createUser(payload) {
        // const { firstname, Lastame, email, password } = payload
        this.logger.log(payload)
        return await this.repository.save(payload);
    }

    async getUsers() {
        return await this.repository.find();
    }

}