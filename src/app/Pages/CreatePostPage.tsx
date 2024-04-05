import styled from "styled-components";
import {StyledButton, StyledError, StyledForm, StyledInput, StyledLoginContainer} from "./LoginPage";
import Header from "./Header";
import {useEffect, useId, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {selectActiveUser, setLoggedInUser} from "../User/LoggedInUserSlice";
import {Post} from "../Post/PostType";
import {useDispatch} from "react-redux";
import {createPost} from "../Post/PostSlice";
import {useNavigate} from "react-router-dom";
import {StyledSelect, StyledTextArea} from "../Register/NexusNetUserData";
import {ReactComponent as XSVG} from "../../static/images/x.svg";
import { v4 as uuidv4 } from 'uuid';




const StyledCreatePostContainer = styled.div`
  display: flex;
  margin: 100px 0 0 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledPageTitle = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
`;

const StyledHashtagsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: -10px;
  padding: 0 15px;
`;

const StyledHashtag = styled.div`
  background-color: #282c34;
  font-size: 0.75rem;
  width: fit-content;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function CreatePost() {
    const activeUser = useAppSelector(selectActiveUser);
    const postId = uuidv4();
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [hashtag, setHashtag] = useState("");
    const [disabled, setDisabled] = useState(true);


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(type !== "" &&
        title !== "" &&
        description !== "") {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }

    }, [type, title, description])


    function newPost(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const date = new Date();
        const newP: Post = {
            id: postId,
            author: activeUser.username,
            type: type,
            status: "NEW",
            title: title,
            shortDescription: shortDescription,
            description: description,
            image: "",
            createdDate: date.toString(),
            edited: false,
            editedDate: "",
            comments: [],
            likes: 0,
            hashtags: hashtags
        }
        dispatch(createPost(newP));
        console.log(newP);
        // navigate("/");
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
                <StyledPageTitle>Create Post</StyledPageTitle>
                <StyledForm onSubmit={newPost}>
                    <StyledInput id="title"
                                 type="text"
                                 placeholder="Title"
                                 value={title}
                                 onChange={(event) => setTitle(event.target.value)}/>
                    <StyledSelect id="type" name="type" defaultValue={"Select type"} onChange={(event) => setType(event.target.value)}>
                        <option label="Select type" value="" hidden ></option>
                        <option label="Post" value="Post"></option>
                        <option label="Project" value="Project"></option>
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
                                <XSVG onClick={() => removeHashtag(h)} style={{color: "#ffffff", width: "20px", height: "20px"}}/>
                            </StyledHashtag>
                        ))}
                    </StyledHashtagsContainer>
                    <StyledInput id="hashtags"
                                 type="text"
                                 placeholder="Hashtags - press Tab to add"
                                 value={hashtag}
                                 onChange={(event) => setHashtag(event.target.value)}
                                 onKeyDown={onKeyDown}/>

                    <StyledButton disabled={disabled} type={"submit"}>Create</StyledButton>
                </StyledForm>
            </StyledCreatePostContainer>
        </>
    )
}