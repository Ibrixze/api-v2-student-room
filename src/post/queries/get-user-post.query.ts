import { IQuery } from "@nestjs/cqrs";

export class GetUserPostsQuery implements IQuery {
    constructor(
        public readonly userId: string
    ) { }
}