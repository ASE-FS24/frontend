import {Comment} from "../Comment/CommentType";

export interface Post {
    id: string;
    author: string;
    type: string;
    status: string;
    title: string;
    shortDescription?: string;
    description: string;
    image?: string;
    createdDateTime: string;
    edited: boolean;
    editedDateTime: string;
    comments: Array<Comment>
    likes: number;
    hashtags: Array<string>
}

export interface NewPost {
    authorId: string;
    type: string;
    status: string;
    title: string;
    shortDescription?: string;
    description: string;
    image?: string;
    hashtags: Array<string>
}
