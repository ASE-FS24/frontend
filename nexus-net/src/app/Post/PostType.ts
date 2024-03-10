import {Comment} from "../Comment/CommentType";

export interface Post {
    id: string;
    title: string;
    shortDescription?: string;
    description: string;
    image?: string;
    comments: Array<Comment>
    likes: number;
    Hashtags: Array<string>
}
