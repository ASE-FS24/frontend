import {FollowUser, User, UserSummary} from "./UserType";

const baseurl = process.env.REACT_APP_USER_BASEURL;

const mockUser = {
    id: "ae14b32e-9418-4be6-bebf-b56903d40578",
    username: "mockuser2",
    profilePicture: ""
}

const mockUsers = [
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40577",
        username: "mockuser1",
        profilePicture: "",
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40578",
        username: "mockuser2",
        profilePicture: "",
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40579",
        username: "mockuser3",
        profilePicture: "",
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40580",
        username: "mockuser4",
        profilePicture: "",
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40581",
        username: "mockuser5",
        profilePicture: "",
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40582",
        username: "mockuser6",
        profilePicture: "",
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40583",
        username: "mockuser7",
        profilePicture: "",
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40584",
        username: "mockuser8",
        profilePicture: "",
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40585",
        username: "mockuser9",
        profilePicture: "",
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40586",
        username: "mockuser10",
        profilePicture: "",
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40587",
        username: "mockuser11",
        profilePicture: "",
    },
    mockUser
]


export function getAllUsers(): Promise<UserSummary[]> {
    return fetch(baseurl + "users/")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
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
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.log(error)
            console.log("Mock user created:");
            console.log(JSON.stringify(user));
        });
}

export function getUser(userId: string): Promise<User> {
    return fetch(baseurl + "users/" + userId)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
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
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
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

export async function getProfilePic(userId: string, endpoint: string = "users"): Promise<string | null> {
    try {
        const response = await fetch(baseurl + endpoint + `/${userId}/profilePicture`, {
            method: 'GET',
        });

        if (!response.ok) {
            // If the response is not successful, throw an error
            throw new Error(`Failed to retrieve profile picture: ${response.statusText}`);
        }

        // Return the response text (URL of the profile picture)
        return await response.text();
    } catch (error) {
        // Handle errors gracefully
        console.error(`Error retrieving profile picture: ${error}`);
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

const networkMockData = {
    // nodes: [
    //     {id: '0c83f09a-1c14-4e54-b7aa-48041fda6103', name: 'DGERGELY123', val: 10},
    //     {id: 'id2', name: 'name2', val: 10},
    //     {id: 'id3', name: 'name3', val: 5},
    //     {id: 'id4', name: 'name4', val: 7},
    //     {id: 'id5', name: 'name5', val: 3},
    //     {id: 'id6', name: 'name6', val: 9},
    //     {id: 'id7', name: 'name7', val: 2},
    //     {id: 'id8', name: 'name8', val: 8},
    //     {id: 'id9', name: 'name9', val: 6},
    //     {id: 'id10', name: 'name10', val: 4}
    // ],
    links: [
        {source: '0c83f09a-1c14-4e54-b7aa-48041fda6103', target: 'id2'},
        {source: 'id2', target: 'id3'},
        {source: 'id2', target: 'id4'},
        {source: 'id3', target: 'id5'},
        {source: 'id3', target: 'id6'},
        {source: 'id6', target: 'id7'},
        {source: '0c83f09a-1c14-4e54-b7aa-48041fda6103', target: 'id8'},
        {source: 'id9', target: 'id9'},
        {source: 'id9', target: 'id10'},
        {source: '0c83f09a-1c14-4e54-b7aa-48041fda6103', target: 'id3'}
    ]
};

const followerMockData = [
    {id: "testId1", username: "Test1", profilePictureUrl: ""},
    {id: "testId2", username: "Test2", profilePictureUrl: ""},
    {id: "testId3", username: "Test3", profilePictureUrl: ""},
    {id: "testId4", username: "Test4", profilePictureUrl: ""},
    {id: "testId5", username: "Test5", profilePictureUrl: ""},
    {id: "testId6", username: "Test6", profilePictureUrl: ""},
    {id: "testId7", username: "Test7", profilePictureUrl: ""},
    {id: "testId8", username: "Test8", profilePictureUrl: ""}
]

export async function getNetwork(): Promise<FollowUser[]> {
    try {
        const response = await fetch(baseurl + `users/network`, {
            method: 'GET'
        });

        if (!response.ok) {
            // If the response is not successful, throw an error
            throw new Error(`Failed to retrieve followers: ${response.statusText}`);
        }

        // Return the response text
        return await response.json();
    } catch (error) {
        // Handle errors gracefully
        console.error(`Error retrieving followers: ${error}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(networkMockData.links);
            }, 1000)
        });
    }
}

export async function getFollowers(userId: string): Promise<{id: string, username: string, profilePictureUrl: string}[]> {
    try {
        const response = await fetch(baseurl + `users/${userId}/followers`, {
            method: 'GET'
        });

        if (!response.ok) {
            // If the response is not successful, throw an error
            throw new Error(`Failed to retrieve followers: ${response.statusText}`);
        }

        // Return the response text
        return await response.json();
    } catch (error) {
        // Handle errors gracefully
        console.error(`Error retrieving followers: ${error}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(followerMockData);
            }, 1000)
        });
    }
}
