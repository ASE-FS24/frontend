import {Comment} from "../Comment/CommentType";

export interface Post {
    id: string;
    author: string;
    type: string;
    title: string;
    shortDescription?: string;
    description: string;
    image?: string;
    createdDate: string;
    edited: boolean;
    editedDate: string;
    comments: Array<Comment>
    likes: number;
    hashtags: Array<string>
}
