import styled from "styled-components";
import {Post} from "./PostType"

const StyledPost = styled.div`
  display: flex;
  color: white;
  background-color: #282c34;
  justify-content: center;
  margin: 10px;
  padding:10px 20px;
  flex-direction: column;
`;

const StyledPostTitle = styled.div`
  font-size: 2rem;
  text-align: left;
  margin-bottom: 10px;
`;

const StyledPostContent = styled.div`
  font-size: 1.5rem;
  text-align: left;
  margin: 0 5px;
`;

const StyledLikes = styled.div`
  margin-left: auto;
  font-size: 2.5rem;
`;

function PostComponent({ post }: { post: Post }) {
    return (
        <StyledPost>
            <StyledPostTitle>{post.title}</StyledPostTitle>
            <StyledPostContent>{post.description}</StyledPostContent>
            <StyledLikes>Likes: {post.likes}</StyledLikes>
        </StyledPost>
    )
}

export default PostComponent;