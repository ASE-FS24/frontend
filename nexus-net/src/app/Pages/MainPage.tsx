import styled from "styled-components";
import {useAppSelector} from "../hooks";
import Post from "../Post/PostComponent";
import {selectAllPosts} from "../Post/PostSlice";
import Header from "./Header";


const StyledMainPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const StyledFiltersContainer = styled.div`
  border: 1px solid black;
  height: 40px;
  width: 100%;
`;

const StyledPosts = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  flex-direction: column;
  margin: 10px;
  padding: 15px;
  background: rgb(255, 255, 255, 0.5);
`;

function Home() {
    const posts = useAppSelector(selectAllPosts);

    return (
        <>
            <Header/>
            <StyledMainPage>
                <StyledPosts>
                    <StyledFiltersContainer/>
                    {posts && posts.map((post) => (
                        <Post key={post.id} post={post}/>
                    ))}
                </StyledPosts>
            </StyledMainPage>
        </>
    );
}

export default Home;