import { ICommand } from "@nestjs/cqrs";


type AddPost = {
    numberOfRooms: number;
    price: 3000;
    address: string;
    category: string
}

export class AddPostCommand implements ICommand {
    constructor(
        public readonly payload: AddPost,
        public readonly user: string
    ) { }
}