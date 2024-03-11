import {Comment} from "../Comment/CommentType";

export interface Post {
    id: string;
    authorId: string;
    type: string;
    title: string;
    shortDescription?: string;
    description: string;
    image?: string;
    comments: Array<Comment>
    likes: number;
    hashtags: Array<string>
}
