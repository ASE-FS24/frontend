import {User} from "./UserType";

const baseurl = process.env.REACT_APP_USER_BASEURL;

const mockUser = {
    id: "MockUser2",
    email: "user2@mock.com",
    firstName: "User2",
    lastName: "Mock",
    username: "mockuser2",
    motto: "I'm the second best mock user out there",
    university: "UZH",
    bio: "This is my crazy bio 2",
    degreeProgram: 'Masters',
    birthday: "-",
    profilePicture: "",
    followedUsers: []
}

const mockUsers = [
    {
        id: "MockUser1",
        email: "gleinad11@gmail.com",
        firstName: "User1",
        lastName: "Mock",
        username: "mockuser1",
        motto: "I'm the best mock user out there",
        university: "UZH",
        bio: "This is my crazy bio",
        degreeProgram: 'Masters',
        birthday: "-",
        profilePicture: "",
        followedUsers: ["MockUser2"]
    },
    mockUser
]


export function getAllUsers(): Promise<User[]> {
    return fetch(baseurl + "users/all/")
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => {
            console.log(error)
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockUsers);
                }, 1000)
            })
        })
}

export function createUser(user: User) {
    return fetch(baseurl + "users", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => {
            console.log(error)
            console.log("Mock user created:");
            console.log(JSON.stringify(user));
        });
}

export function getUser(userId: string): Promise<User> {
    return fetch(baseurl + "users/" + userId)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => {
            console.log(error);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockUser);
                }, 1000)
            })
        });
}

export function getUserByUsername(username: string): Promise<User> {
    return fetch(baseurl + "users/username" + username)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => {
            console.log(error);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockUser);
                }, 1000)
            })
        });
}