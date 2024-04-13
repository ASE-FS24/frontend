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

const followerMockData = {
    nodes: [
        {id: '0c83f09a-1c14-4e54-b7aa-48041fda6103', name: 'DGERGELY123', val: 10},
        {id: 'id2', name: 'name2', val: 10},
        {id: 'id3', name: 'name3', val: 5},
        {id: 'id4', name: 'name4', val: 7},
        {id: 'id5', name: 'name5', val: 3},
        {id: 'id6', name: 'name6', val: 9},
        {id: 'id7', name: 'name7', val: 2},
        {id: 'id8', name: 'name8', val: 8},
        {id: 'id9', name: 'name9', val: 6},
        {id: 'id10', name: 'name10', val: 4}
    ],
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

export interface FollowerData {
    nodes: { id: string; name: string; val: number; }[];
    links: { source: string; target: string; }[];
}

export async function getFollowers(useId: string): Promise<FollowerData> {
    try {
        const response = await fetch(baseurl + `users/${useId}/followers`, {
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
                const nodesMap = followerMockData.links.reduce((acc, link) => {
                    [link.source, link.target].forEach(id => {
                        acc.has(id) ? acc.get(id)!.val += 1 : acc.set(id, {id, name: id, val: 1});
                    });
                    return acc
                }, new Map<string, { id: string, name: string, val: number }>())
                const nodes = Array.from(nodesMap.values());

                const data = {nodes: nodes, links: followerMockData.links}

                resolve(data);
            }, 1000)
        });
    }
}
