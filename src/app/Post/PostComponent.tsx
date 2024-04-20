import styled from "styled-components";
import {ReactComponent as LikeSVG} from "../../static/images/heart.svg";
import {ReactComponent as FireSVG} from "../../static/images/fire.svg";
import {ReactComponent as ShareSVG} from "../../static/images/share.svg";
import {ReactComponent as ReportSVG} from "../../static/images/report.svg";
import {ReactComponent as ProjectSVG} from "../../static/images/project.svg";
import {ReactComponent as PostSVG} from "../../static/images/camera.svg";
import {dateFormatter, stringToDate} from "../Util/util";
import CommentComponent from "../Comment/CommentComponent";
import {useEffect, useState} from "react";
import {commentOnPost, getComments} from "../Comment/CommentService";
import {Comment} from "../Comment/CommentType";
import {StyledButtonSmall, StyledInput} from "../Pages/LoginPage";
import {useAppDispatch, useAppSelector} from "../hooks";
import {selectActiveUser} from "../User/LoggedInUserSlice";
import { v4 as uuidv4 } from 'uuid';
import {likePost} from "./PostService";
import {fetchPost, selectPostsById} from "./PostSlice";


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
  top: 18px;
  right: 8px;
  font-size: 1.25rem;
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

function PostComponent({postId}: { postId: string }) {
    const activeUser = useAppSelector(selectActiveUser);
    const post = useAppSelector(state => selectPostsById(state, postId));
    const [comments, setComments] = useState<Comment[]>([]);
    const postDate = dateFormatter(post.edited ? post.editedDateTime : post.createdDateTime);
    const [showComments, setShowComments] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [reloadComponent, setReloadComponent] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function fetchComments(postId: string) {
            const postComments = await getComments(postId);
            postComments.sort((a, b) => {
                const d1 = stringToDate(a.createdAt);
                const d2 = stringToDate(b.createdAt);
                return d1.getTime() - d2.getTime();
            });
            setComments(postComments);
        }

        if (reloadComponent) {
            dispatch(fetchPost(post.id));
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
            authorId: activeUser.username,
            content: commentContent,
            likeNumber: 0,
            createdAt: ""
        }
        await commentOnPost(newComment, post.id).then();
        setReloadComponent(true);
        setCommentContent("");
    }

    function like() {
        if (activeUser) {
            likePost(post.id, activeUser.username).then(() => setReloadComponent(true));
        }
    }

    return (
        <>
            <StyledPost>
                <StyledPostContent>
                    <StyledPostHeader>
                        <StyledPostType color={post.type === "POST" ? "#00aaff" : "#ff0000"}>
                            {post.type === "POST" ?
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
                    <StyledIconContainer onClick={like} title="Like">
                        <LikeSVG style={{color: "#E72950", width: "45px", height: "45px"}}/>
                    </StyledIconContainer>
                    <StyledIconContainer onClick={() => setShowComments(!showComments)} title="Comments">
                        <FireSVG style={{width: "45px", height: "45px"}}/>
                    </StyledIconContainer>
                    <StyledIconContainer title="Share - not implemented yet">
                        <ShareSVG style={{width: "45px", height: "45px"}}/>
                    </StyledIconContainer>
                    <StyledIconContainer last={"auto"} title="Report - not implemented yet">
                        <ReportSVG style={{width: "45px", height: "45px"}}/>
                    </StyledIconContainer>
                    <StyledLikes>{post.likeNumber}</StyledLikes>
                </StyledInteractionsContainer>

            </StyledPost>
            {showComments &&
                <StyledCommentsContainer>
                    {comments.length > 0 ? comments.map((comment) => (
                        <CommentComponent key={comment.id} comment={comment} setReloadComponent={setReloadComponent}/>
                    )) : <StyledNoCommentsContainer>No comments yet...</StyledNoCommentsContainer>}
                    {activeUser !== null ?
                                <StyledCommentForm onSubmit={handleCommentFormSubmit}>
                                    <StyledInput type="text" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
                                    <StyledButtonSmall type="submit">Comment</StyledButtonSmall>
                                </StyledCommentForm> :
                        <StyledNoCommentsContainer>Sign in to comment</StyledNoCommentsContainer>}
                </StyledCommentsContainer>
            }
        </>
    )
}

export default PostComponent;