import {User} from "./UserType";

const baseurl = process.env.REACT_APP_USER_BASEURL;

const mockUsers = [
    {
        id: "MockUser1",
        email: "user1@mock.com",
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
    {
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
]


export function getAllUsers(): Promise<User[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUsers);
        }, 1000)
    })
    // return fetch(baseurl + "users/all/")
    //     .then(response => response.json())
    //     .then(data => {
    //         return data
    //     })
    //     .catch(error => console.log(error))
}