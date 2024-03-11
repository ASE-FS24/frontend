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
    degreeProgram?: string;
    birthday?: string;
    profilePicture?: string;
    followedUsers: Array<String>;
}
