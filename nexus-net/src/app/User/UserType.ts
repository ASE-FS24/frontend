import {Post} from "../Post/PostType";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    motto?: string;
    university: string;
    bio?: string;
    degreeProgram?: 'Bachelors' | 'Masters' | "PhD" | "Other";
    birthday?: string;
    profilePicture?: string;
    posts: Array<Post>;
    followedUsers: Array<User>;
}
