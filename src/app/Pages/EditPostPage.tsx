import styled from "styled-components";
import {StyledButton, StyledForm, StyledInput, StyledLoginContainer} from "./LoginPage";
import Header from "./Header";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {selectActiveUser} from "../User/LoggedInUserSlice";
import {Post, PostUpdate} from "../Post/PostType";
import {useNavigate, useParams} from "react-router-dom";
import {StyledSelect, StyledTextArea} from "../Register/NexusNetUserData";
import {ReactComponent as XSVG} from "../../static/images/x.svg";
import {getPost, updatePost} from "../Post/PostService";
import {StyledCreatePostContainer, StyledHashtag, StyledHashtagsContainer, StyledPageTitle} from "./CreatePostPage";


export default function EditPost() {
    const activeUser = useAppSelector(selectActiveUser);
    const {postId} = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState<string | undefined>("");
    const [description, setDescription] = useState("");
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [hashtag, setHashtag] = useState("");
    const [disabled, setDisabled] = useState(true);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            if (postId !== undefined) {
                const fetchedPost = await getPost(postId);
                setPost(fetchedPost);
                setType(fetchedPost.type);
                setTitle(fetchedPost.title);
                setShortDescription(fetchedPost.shortDescription);
                setDescription(fetchedPost.description);
                setHashtags(fetchedPost.hashtags);
            }
        }

        fetchPost().then();

    }, [postId]);

    useEffect(() => {
        if (post !== null) {
            if (type !== post.type ||
                title !== post.title ||
                description !== post.description ||
                shortDescription !== post.shortDescription ||
                hashtags !== post.hashtags) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }

    }, [type, title, description, shortDescription, hashtags])


    function submitUpdatePost(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (post !== null) {
            const updatedPost: PostUpdate = {
                postId: post.id,
                type: type,
                status: post.status,
                title: title,
                shortDescription: shortDescription,
                description: description,
                image: "",
                hashtags: hashtags
            }
            updatePost(updatedPost).then(() => navigate("/"));
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            if (!hashtags.includes(hashtag)) {
                setHashtags([...hashtags, hashtag])
            }
            setHashtag("");
        }
    }

    const removeHashtag = (ht: string) => {
        const updatedHashtags = hashtags.filter(h => h !== ht);
        setHashtags(updatedHashtags);
    }

    return (
        <>
            <Header/>
            <StyledCreatePostContainer>
                <StyledButton onClick={() => navigate("/")}>Back</StyledButton>
                <StyledPageTitle>Update Post</StyledPageTitle>
                <StyledForm onSubmit={submitUpdatePost}>
                    <StyledInput id="title"
                                 type="text"
                                 placeholder="Title"
                                 value={title}
                                 onChange={(event) => setTitle(event.target.value)}/>
                    <StyledSelect id="type" name="type" defaultValue={type}
                                  onChange={(event) => setType(event.target.value)}>
                        <option label="Post" value="POST"></option>
                        <option label="Project" value="PROJECT"></option>
                    </StyledSelect>
                    <StyledInput id="shortDescription"
                                 type="text"
                                 placeholder="Short Description"
                                 value={shortDescription}
                                 onChange={(event) => setShortDescription(event.target.value)}/>
                    <StyledTextArea id="description"
                                    rows={6}
                                    cols={30}
                                    value={description}
                                    placeholder="Description of your post"
                                    onChange={(event) => setDescription(event.target.value)}/>
                    <StyledHashtagsContainer>
                        {hashtags.map((h) => (
                            <StyledHashtag key={hashtag}>#{h}
                                <XSVG onClick={() => removeHashtag(h)}
                                      style={{color: "#ffffff", width: "20px", height: "20px"}}/>
                            </StyledHashtag>
                        ))}
                    </StyledHashtagsContainer>
                    <StyledInput id="hashtags"
                                 type="text"
                                 placeholder="Hashtags - press Tab to add"
                                 value={hashtag}
                                 onChange={(event) => setHashtag(event.target.value)}
                                 onKeyDown={onKeyDown}/>

                    <StyledButton disabled={disabled} type={"submit"}>Update</StyledButton>
                </StyledForm>
            </StyledCreatePostContainer>
        </>
    )
}