import {User} from "../User/UserType";

export interface Comment {
    id: string;
    author: User;
    content: string;
    likes: number;
}