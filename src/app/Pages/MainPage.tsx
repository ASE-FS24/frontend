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
import {ReactComponent as SearchSVG} from "../../static/images/search.svg";
import {selectActiveUser} from "../User/LoggedInUserSlice";
import {useNavigate} from "react-router-dom";


const StyledMainPage = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 64px);
`;

const StyledMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 25%;
  max-width: 25%;
  font-size: 2rem;
  padding: 20px;
`;

export const StyledMenuButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  border-radius: 5px;
  width: 250px;
  height: 30px;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: -2px -2px 10px 2px rgba(255, 255, 255, .8);
  margin: 15px 50px;

  &:hover {
    box-shadow: -1px -1px 5px 2px rgba(255, 255, 255, .8);
    cursor: pointer;
    scale: 0.95;
  }`;

const StyledContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  flex-direction: column;
  margin: 0;
  background: rgb(255, 255, 255, 0.5);
`;

const StyledToolbarContainer = styled.div`
  height: 80px;
  max-width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

const StyledToolRowContainer = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: auto;
`;

const StyledSearchInput = styled.input`
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 0 10px;
  color: #ffffff;
  margin-left: auto;
  height: 30px;

  &::placeholder {
    color: #ffffff;
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder { /* Edge 12 -18 */
    color: #ffffff;
  }
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
  padding: 15px 0 15px 0;
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
    const activeUser = useAppSelector(selectActiveUser);
    const navigate = useNavigate();
    const allPosts = useAppSelector(selectAllPosts);
    const [posts, setPosts] = useState(allPosts);
    const [projectFilter, setProjectFilter] = useState(false);
    const [postFilter, setPostFilter] = useState(false);
    const [allFilter, setAllFilter] = useState(true);

    const [likeSort, setLikeSort] = useState(true);
    const [searchValue, setSearchValue] = useState("");


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

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            searchPosts()
        }
    }

    function searchPosts() {
        if (searchValue.length > 1) {
            const filteredPosts = allPosts.filter((p) =>  {
                const { title, type, author, description, hashtags} = p;
                return (
                    title.toLowerCase().includes(searchValue.toLowerCase()) ||
                    type.toLowerCase().includes(searchValue.toLowerCase()) ||
                    author.toLowerCase().includes(searchValue.toLowerCase()) ||
                    description.toLowerCase().includes(searchValue.toLowerCase()) ||
                    hashtags.some((tag: string) => tag.toLowerCase().includes(searchValue.toLowerCase()))
                );
            });
            setPosts(filteredPosts);
        }
    }

    return (
        <>
            <Header/>
            <StyledMainPage>
                <StyledMenuContainer>
                    {activeUser !== null ?
                        <>
                            <StyledMenuButton onClick={() => navigate("/post/create")}>New Post</StyledMenuButton>
                            <StyledMenuButton>Connections</StyledMenuButton>
                        </> :
                        <></>}
                </StyledMenuContainer>
                <StyledContentContainer>
                    <StyledToolbarContainer>
                        <StyledToolRowContainer>
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
                        </StyledToolRowContainer>
                        <StyledToolRowContainer>
                            <StyledSearchContainer>
                                <StyledSearchInput id="search"
                                                   value={searchValue}
                                                   placeholder="Search..."
                                                   onChange={(event) => setSearchValue(event.target.value)}
                                                   onKeyDown={onEnter}/>
                                <StyledFilterIconContainer onClick={() => searchPosts()}
                                                           style={{marginLeft: "10px", marginRight: "10px"}}>
                                    <SearchSVG style={{color: "#000000", width: "30px", height: "30px"}}/>
                                </StyledFilterIconContainer>
                            </StyledSearchContainer>
                            <StyledFilterButton selected={false} onClick={() => {
                                setPosts(allPosts)
                                setSearchValue("");
                                setProjectFilter(false);
                                setPostFilter(false);
                                setAllFilter(true);
                            }}>Reset</StyledFilterButton>

                        </StyledToolRowContainer>
                    </StyledToolbarContainer>
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