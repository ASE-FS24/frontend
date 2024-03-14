import styled from "styled-components";
import {useAppSelector} from "../hooks";
import Post from "../Post/PostComponent";
import {selectAllPosts} from "../Post/PostSlice";
import Register from "./RegisterPage";


const StyledMainPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const StyledPosts = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  flex-direction: column;
  margin: 10px;
`;

function Home() {
    const posts = useAppSelector(selectAllPosts);

    return (
        <StyledMainPage>
            {/*<StyledPosts>*/}
            {/*    {posts && posts.map((post) => (*/}
            {/*        <Post key={post.id} post={post}/>*/}
            {/*    ))}*/}
            {/*</StyledPosts>*/}
            <Register/>
        </StyledMainPage>
    );
}

export default Home;