import {Post} from "./PostType";

const baseurl = process.env.REACT_APP_POST_BASEURL;

const mockPosts = [
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40576",
        author: "mockuser1",
        type: "Project",
        status: "IN PROGRESS",
        title: "Mock Title 1",
        shortDescription: "This is a short description of the first mock post.",
        description: "This is the long description of the first mock post. This is the long description of the first mock post. This is the long description of the first mock post. This is the long description of the first mock post.",
        image: "",
        createdDate: "2024-03-12T12:00:00Z",
        edited: false,
        editedDate: "",
        comments: [],
        likes: 0,
        hashtags: ["#MockPost4ever"]
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40575",
        author: "mockuser1",
        type: "Post",
        status: "NEW",
        title: "Mock Title 2",
        shortDescription: "This is a short description of the second mock post.",
        description: "This is the long description of the second mock post. This is the long description of the second mock post. This is the long description of the second mock post. This is the long description of the second mock post.",
        image: "",
        createdDate: "2024-03-13T16:27:00Z",
        edited: true,
        editedDate: "2024-03-14T11:19:00Z",
        comments: [],
        likes: 3,
        hashtags: ["#MockPost4ever"]
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40574",
        author: "mockuser1",
        type: "Post",
        status: "NEW",
        title: "Mock Title 3",
        shortDescription: "This is a short description of the third mock post.",
        description: "This is the long description of the third mock post. This is the long description of the third mock post. This is the long description of the third mock post. This is the long description of the third mock post.",
        image: "",
        createdDate: "2024-03-15T16:27:00Z",
        edited: true,
        editedDate: "2024-03-16T11:19:00Z",
        comments: [],
        likes: 2,
        hashtags: ["#MockPost4ever"]
    },
    {
        id: "ae14b32e-9418-4be6-bebf-b56903d40573",
        author: "mockuser1",
        type: "Project",
        status: "COMPLETED",
        title: "Mock Title 4",
        shortDescription: "This is a short description of the fourth mock post.",
        description: "This is the long description of the fourth mock post. This is the long description of the fourth mock post. This is the long description of the fourth mock post. This is the long description of the fourth mock post.",
        image: "",
        createdDate: "2024-03-10T15:00:00Z",
        edited: false,
        editedDate: "",
        comments: [],
        likes: 12,
        hashtags: ["#MockPost4ever"]
    }
]

export function getAllPosts(): Promise<Post[]> {
    return fetch(baseurl + "posts/all/")
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => {
            console.log(error);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockPosts);
                }, 1000); // Simulate a 1 second delay
            });
        })
}

export function createNewPost(post: Post): Promise<Post> {
    return fetch(baseurl + "posts/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        .then(response => response.json())
        .then(data => {
            return post
        })
        .catch(error => {
            console.log(error);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(post);
                }, 1000); // Simulate a 1 second delay
            });
        })
}