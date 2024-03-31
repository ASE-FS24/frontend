import {User} from "../User/UserType";

export interface Comment {
    id: string;
    postId: string;
    author: User;
    content: string;
    likes: number;
}