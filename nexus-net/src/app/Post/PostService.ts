import {Post} from "./PostType";

const baseurl = process.env.REACT_APP_POST_BASEURL;

const mockPosts = [
    {
        id: "MockPost101",
        author: "mockuser1",
        type: "Project",
        title: "Mock Title 1",
        shortDescription: "This is a short description of the first mock post.",
        description: "This is the long description of the first mock post. This is the long description of the first mock post. This is the long description of the first mock post. This is the long description of the first mock post.",
        image: "",
        createdDate: "2024-03-12T12:00:00Z",
        edited: false,
        editedDate: "",
        comments: [],
        likes: 4,
        hashtags: ["#MockPost4ever"]
    },
    {
        id: "MockPost102",
        author: "mockuser1",
        type: "Post",
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