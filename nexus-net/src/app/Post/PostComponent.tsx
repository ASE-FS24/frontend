import styled from "styled-components";
import {Post} from "./PostType"

const StyledPost = styled.div`
  display: flex;
  color: white;
  background-color: #282c34;
  justify-content: center;
  margin: 10px;
  padding: 10px 20px;
  flex-direction: row;
`;

const StyledPostToolbar = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const StyledPostContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledPostTitle = styled.div`
  font-size: 2rem;
  text-align: left;
  margin-bottom: 10px;
`;

const StyledPostDescription = styled.div`
  font-size: 1.5rem;
  text-align: left;
  margin: 0 5px;
`;

const StyledLikes = styled.div`
  font-size: 1.5rem;
`;

function PostComponent({post}: { post: Post }) {
    return (
        <StyledPost>
            <StyledPostContent>
                <StyledPostTitle>{post.title}</StyledPostTitle>
                <StyledPostDescription>{post.description}</StyledPostDescription>
            </StyledPostContent>
            <StyledPostToolbar>
                <StyledLikes>{post.likes}</StyledLikes>
            </StyledPostToolbar>

        </StyledPost>
    )
}

export default PostComponent;