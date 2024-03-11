import {Post} from "./PostType";

const baseurl = process.env.REACT_APP_USER_BASEURL;

const mockPosts = [
    {
        id: "MockPost101",
        authorId: "MockUser1",
        title: "Mock Title 1",
        shortDescription: "This is a short description of the first mock post.",
        description: "This is the long description of the first mock post. This is the long description of the first mock post. This is the long description of the first mock post. This is the long description of the first mock post.",
        image: "",
        comments: [],
        likes: 4,
        Hashtags: ["#MockPost4ever"]
    },
    {
        id: "MockPost102",
        authorId: "MockUser1",
        title: "Mock Title 2",
        shortDescription: "This is a short description of the second mock post.",
        description: "This is the long description of the second mock post. This is the long description of the second mock post. This is the long description of the second mock post. This is the long description of the second mock post.",
        image: "",
        comments: [],
        likes: 3,
        Hashtags: ["#MockPost4ever"]
    }
]

export function getAllPosts(): Promise<Post[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPosts);
        }, 1000); // Simulate a 1 second delay
    });
    // return fetch(baseurl + "posts/all/")
    //     .then(response => response.json())
    //     .then(data => {
    //         return data
    //     })
    //     .catch(error => console.log(error))
}