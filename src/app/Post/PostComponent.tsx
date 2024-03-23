import styled from "styled-components";
import {Post} from "./PostType";
import {ReactComponent as LikeSVG} from "../../static/images/heart.svg";
import {ReactComponent as FireSVG} from "../../static/images/fire.svg";
import {ReactComponent as ShareSVG} from "../../static/images/share.svg";
import {ReactComponent as ReportSVG} from "../../static/images/report.svg";
import {ReactComponent as ProjectSVG} from "../../static/images/project.svg";
import {ReactComponent as PostSVG} from "../../static/images/camera.svg";
import {dateFormatter} from "../Util/util";


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

const StyledPostType = styled.div<{color: string}>`
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

const StyledIconContainer = styled.div<{ last?: string; }>`
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

function PostComponent({post}: { post: Post }) {
    const postDate = dateFormatter(post.edited ? post.editedDate : post.createdDate);
    return (
        <StyledPost>
            <StyledPostContent>
                <StyledPostHeader>
                    <StyledPostType color={post.type === "Post" ? "#00aaff": "#ff0000"}>
                        {post.type === "Post" ?
                            <PostSVG style={{width: "30px", height: "30px", color: "#00aaff"}}/> :
                            <ProjectSVG style={{width: "30px", height: "30px", color: "#ff0000"}}/>}
                        {post.type}
                    </StyledPostType>
                        <StyledPostAuthor>{post.author} - {postDate}</StyledPostAuthor>
                </StyledPostHeader>
                <StyledPostTitle>{post.title}</StyledPostTitle>
                <StyledPostDescription>{post.description}</StyledPostDescription>
            </StyledPostContent>
            <StyledInteractionsContainer>
                <StyledIconContainer>
                    <LikeSVG style={{width: "45px", height: "45px"}}/>
                </StyledIconContainer>
                <StyledIconContainer>
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
    )
}

export default PostComponent;