import styled from "styled-components";
import {Post} from "./PostType";
import {ReactComponent as LikeSVG} from "../../static/images/heart.svg";
import {ReactComponent as FireSVG} from "../../static/images/fire.svg";
import {ReactComponent as ShareSVG} from "../../static/images/share.svg";
import {ReactComponent as ReportSVG} from "../../static/images/report.svg";
import {ReactComponent as ProjectSVG} from "../../static/images/project.svg";
import {ReactComponent as PostSVG} from "../../static/images/camera.svg";
import {dateFormatter} from "../Util/util";
import CommentComponent from "../Comment/CommentComponent";
import {useEffect, useState} from "react";
import {commentOnPost, getComments} from "../Comment/CommentService";
import {Comment} from "../Comment/CommentType";
import {StyledButton, StyledButtonSmall, StyledInput} from "../Pages/LoginPage";
import {useAppSelector} from "../hooks";
import {selectActiveUser} from "../User/LoggedInUserSlice";
import { v4 as uuidv4 } from 'uuid';
import {likePost} from "./PostService";


const StyledPost = styled.div`
  display: flex;
  color: white;
  background-color: #282c34;
  justify-content: center;
  margin: 10px;
  flex-direction: row;
`;

const StyledPostContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  padding: 25px;
`;

const StyledPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: -10px 0 10px 0;
  font-style: italic;
`;

const StyledPostType = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.color};
`;

const StyledPostAuthor = styled.div`
  width: fit-content;
  margin-left: auto;
`;

const StyledPostTitle = styled.div`
  font-size: 2rem;
  text-align: left;
  margin-bottom: 10px;
  border-bottom: 1px solid white;
`;

const StyledPostDescription = styled.div`
  font-size: 1.5rem;
  text-align: left;
  margin: 0 5px;
`;

const StyledInteractionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #000000;
  min-width: 60px;
  padding-left: 10px;
  position: relative;
`;


export const StyledIconContainer = styled.div<{ last?: string; }>`
  display: flex;
  align-items: center;
  margin-top: ${props => props.last || "0"};

  &:hover {
    cursor: pointer;
    scale: 1.025;
  }
`;

const StyledLikes = styled.div`
  position: absolute;
  top: 8px;
  right: 30px;
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
    scale: 1.025;
  }
`;

const StyledCommentsContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledNoCommentsContainer = styled.div`
  width: 100%;
  color: #000000;
  margin: 10px 0;
`;

const StyledCommentForm = styled.form`
  margin: 5px 5px 5px auto;
`;

function PostComponent({post}: { post: Post }) {
    const activeUser = useAppSelector(selectActiveUser);
    const [comments, setComments] = useState<Comment[]>([]);
    const postDate = dateFormatter(post.edited ? post.editedDateTime : post.createdDateTime);
    const [showComments, setShowComments] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [reloadComponent, setReloadComponent] = useState(true);
    const [showCommentForm, setShowCommentForm] = useState(false);

    useEffect(() => {
        async function fetchComments(postId: string) {
            const postComments = await getComments(postId);
            setComments(postComments);
        }

        if (reloadComponent) {
            fetchComments(post.id).then();
            setReloadComponent(false)
        }

    }, [post.id, reloadComponent]);

    const handleCommentFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const commentId = uuidv4();
        const newComment: Comment = {
            id: commentId,
            postId: post.id,
            author: activeUser.username,
            content: commentContent,
            likes: 0
        }
        await commentOnPost(newComment, post.id).then();
        setReloadComponent(true);
        setShowCommentForm(false);
        setCommentContent("");
    }

    return (
        <>
            <StyledPost>
                <StyledPostContent>
                    <StyledPostHeader>
                        <StyledPostType color={post.type === "Post" ? "#00aaff" : "#ff0000"}>
                            {post.type === "Post" ?
                                <PostSVG style={{width: "30px", height: "30px", color: "#00aaff"}}/> :
                                <ProjectSVG style={{width: "30px", height: "30px", color: "#ff0000"}}/>}
                            {post.type}
                        </StyledPostType>
                        <StyledPostAuthor>{post.authorId} - {postDate}</StyledPostAuthor>
                    </StyledPostHeader>
                    <StyledPostTitle>{post.title}</StyledPostTitle>
                    <StyledPostDescription>{post.description}</StyledPostDescription>
                </StyledPostContent>
                <StyledInteractionsContainer>
                    <StyledIconContainer onClick={() => activeUser && likePost(post.id, activeUser.id)}>
                        <LikeSVG style={{color: "#E72950", width: "45px", height: "45px"}}/>
                    </StyledIconContainer>
                    <StyledIconContainer onClick={() => setShowComments(!showComments)}>
                        <FireSVG style={{width: "45px", height: "45px"}}/>
                    </StyledIconContainer>
                    <StyledIconContainer>
                        <ShareSVG style={{width: "45px", height: "45px"}}/>
                    </StyledIconContainer>
                    <StyledIconContainer last={"auto"}>
                        <ReportSVG style={{width: "45px", height: "45px"}}/>
                    </StyledIconContainer>
                    <StyledLikes>{post.likes}</StyledLikes>
                </StyledInteractionsContainer>

            </StyledPost>
            {showComments &&
                <StyledCommentsContainer>
                    {comments.length > 0 ? comments.map((comment) => (
                        <CommentComponent key={comment.id} comment={comment}/>
                    )) : <StyledNoCommentsContainer>No comments yet...</StyledNoCommentsContainer>}
                    {activeUser !== null ?
                        <>
                        <StyledButtonSmall margin={"0 10px 0 auto"} onClick={() => setShowCommentForm(true)}>Comment</StyledButtonSmall>
                            {showCommentForm &&
                                <StyledCommentForm onSubmit={handleCommentFormSubmit}>
                                    <StyledInput type="text" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
                                    <StyledButtonSmall type="submit">Save</StyledButtonSmall>
                                    <StyledButtonSmall margin={"0 5px 0 15px"} onClick={() => setShowCommentForm(false)}>Cancel</StyledButtonSmall>
                                </StyledCommentForm>
                            }
                        </>:
                        <StyledNoCommentsContainer>Sign in to comment</StyledNoCommentsContainer>}
                </StyledCommentsContainer>
            }
        </>
    )
}

export default PostComponent;