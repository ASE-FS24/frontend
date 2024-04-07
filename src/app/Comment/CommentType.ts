import {User} from "../User/UserType";

export interface Comment {
    id: string;
    postId: string;
    authorId: User;
    content: string;
    likes: number;
}