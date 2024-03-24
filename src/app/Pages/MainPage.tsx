import styled, {css} from "styled-components";
import {useAppSelector} from "../hooks";
import Post from "../Post/PostComponent";
import {selectAllPosts} from "../Post/PostSlice";
import Header from "./Header";
import {useEffect, useState} from "react";


const StyledMainPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const StyledFiltersContainer = styled.div`
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

export const StyledFilterButton = styled.button<{ selected: boolean }>`
  background-color: #000000;
  color: #ffffff;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: -2px -2px 10px 2px rgba(0, 0, 0, .8);
  margin: 15px auto;

  ${props => props.selected && css`
    opacity: 0.8;
    background-color: #696969;
    box-shadow: none;`
  }
  &:hover {
    ${props => !props.disabled && css`
      box-shadow: -1px -1px 5px 2px rgba(0, 0, 0, .8);
      cursor: pointer;
      scale: 0.95;`
    }

  }`;

function Home() {
    const allPosts = useAppSelector(selectAllPosts);
    const [posts, setPosts] = useState(allPosts);
    const [projectFilter, setProjectFilter] = useState(false);
    const [postFilter, setPostFilter] = useState(false);
    const [allFilter, setAllFilter] = useState(true);


    useEffect(() => {
        if (projectFilter) {
            const filteredPosts = allPosts.filter((p) => p.type === "Project");
            setPosts(filteredPosts);
        } else if (postFilter) {
            const filteredPosts = allPosts.filter((p) => p.type === "Post");
            setPosts(filteredPosts);
        } else if (allFilter) {
            setPosts(allPosts);
        }
    }, [projectFilter, postFilter, allFilter, allPosts])

    return (
        <>
            <Header/>
            <StyledMainPage>
                <StyledPosts>
                    <StyledFiltersContainer>
                        <StyledFilterButton selected={allFilter} onClick={() => {
                            setAllFilter(true)
                            setPostFilter(false);
                            setProjectFilter(false);
                        }
                        }>All</StyledFilterButton>
                        <StyledFilterButton selected={projectFilter} onClick={() => {
                            setProjectFilter(true)
                            setPostFilter(false);
                            setAllFilter(false);
                        }
                        }>Projects</StyledFilterButton>
                        <StyledFilterButton selected={postFilter} onClick={() => {
                            setPostFilter(true)
                            setProjectFilter(false);
                            setAllFilter(false);
                        }
                        }>Posts</StyledFilterButton>
                    </StyledFiltersContainer>
                    {posts && posts.map((post) => (
                        <Post key={post.id} post={post}/>
                    ))}
                </StyledPosts>
            </StyledMainPage>
        </>
    );
}

export default Home;