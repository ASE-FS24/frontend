import styled, {css} from "styled-components";
import {useAppSelector} from "../hooks";
import Post from "../Post/PostComponent";
import {selectAllPosts} from "../Post/PostSlice";
import Header from "./Header";
import {useEffect, useState} from "react";
import {ReactComponent as FilterSVG} from "../../static/images/funnel.svg";
import {ReactComponent as FilterActiveSVG} from "../../static/images/funnel-fill.svg";
import {ReactComponent as SortDownSVG} from "../../static/images/sort-down.svg";
import {ReactComponent as SortUpSVG} from "../../static/images/sort-up.svg";
import {ReactComponent as LikeSVG} from "../../static/images/heart.svg";


const StyledMainPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const StyledContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  flex-direction: column;
  margin: 0;
  padding-top: 15px;
  background: rgb(255, 255, 255, 0.5);
`;

const StyledFiltersContainer = styled.div`
  height: 40px;
  max-width: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;

const StyledFilterIconContainer = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    scale: 1.025;
  }
`;

const StyledPosts = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  flex-direction: column;
  margin-top: 15px;
  max-height: 85vh;
  overflow: auto;
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
  margin: 0;

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

    const [likeSort, setLikeSort] = useState(true);


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

    function sortPosts() {
        if (!likeSort) {
            posts.sort((a, b) => a.likes - b.likes);
        } else {
            posts.sort((a, b) => b.likes - a.likes);
        }
        setLikeSort(!likeSort)
    }

    return (
        <>
            <Header/>
            <StyledMainPage>
                <StyledContentContainer>
                    <StyledFiltersContainer>
                        {allFilter ? <FilterSVG style={{color: "#000000", width: "35px", height: "35px"}}/> :
                            <FilterActiveSVG style={{color: "#000000", width: "35px", height: "35px"}}/>}
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
                        <StyledFilterIconContainer onClick={() => sortPosts()} style={{marginLeft: "auto"}}>
                            <LikeSVG style={{color: "#000000", width: "45px", height: "45px"}}/>
                        </StyledFilterIconContainer>
                        <StyledFilterIconContainer>
                            {likeSort ? <SortUpSVG style={{color: "#ffffff", width: "30px", height: "30px"}}/> :
                                <SortDownSVG style={{color: "#ffffff", width: "30px", height: "30px"}}/>}
                        </StyledFilterIconContainer>
                    </StyledFiltersContainer>
                    <StyledPosts>
                        {posts && posts.map((post) => (
                            <Post key={post.id} post={post}/>
                        ))}
                    </StyledPosts>
                </StyledContentContainer>
            </StyledMainPage>
        </>
    );
}

export default Home;