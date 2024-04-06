import {User} from "./UserType";

const baseurl = process.env.REACT_APP_USER_BASEURL;

const mockUser = {
    id: "ae14b32e-9418-4be6-bebf-b56903d40578",
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
        id: "ae14b32e-9418-4be6-bebf-b56903d40577",
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
        method: 'POST',
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
    return fetch(baseurl + "users/username/" + username)
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

export async function updateUser(user: User, endpoint: string = "users"): Promise<User | null> {
    try {
        const response = await fetch(baseurl + endpoint + `/id/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            // If the response is not successful, throw an error
            throw new Error(`Failed to edit user: ${response.statusText}`);
        }

        // Return the edited user data
        return await response.json();
    } catch (error) {
        // Handle errors gracefully
        console.error(`Error editing user: ${error}`);
        console.log("Mock user created:");
        console.log(JSON.stringify(user));
        return null;
    }
}


export async function updateProfilePic(userId: string, profilePicture: File, endpoint: string = "users"): Promise<string | null> {
    try {
        const formData = new FormData();
        formData.append('profilePicture', profilePicture);

        const response = await fetch(baseurl + endpoint + `/${userId}/profilePicture`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            // If the response is not successful, throw an error
            throw new Error(`Failed to upload profile picture: ${response.statusText}`);
        }

        // Return the response text
        return await response.text();
    } catch (error) {
        // Handle errors gracefully
        console.error(`Error uploading profile picture: ${error}`);
        return null;
    }
}
