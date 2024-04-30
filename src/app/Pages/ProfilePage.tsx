import {useAppDispatch, useAppSelector} from "../hooks";
import styled from "styled-components";
import {logOut, selectActiveUser} from "../User/LoggedInUserSlice";
import UserComponent from "../User/UserComponent";
import {signOut} from "../Util/auth";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import {useEffect, useState} from "react";
import {Post as PostType} from "../Post/PostType";
import Post from "../Post/PostComponent";
import {getPostsOfUser} from "../Post/PostService";
import {StyledFilterButton} from "./MainPage";


const StyledProfileContainer = styled.div`
  position: relative; /* Add relative positioning */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: calc(50vh - 84px);
`;

const ProfileHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
`;

const SignOutButton = styled.button`
  position: absolute; /* Position relative to the container */
  top: 10px; /* Distance from top */
  right: 10px; /* Distance from left */
  background-color: #ff6347;
  color: #fff;
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d53f2d;
  }
`;

const StyledMyPostsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  flex-direction: column;
  margin: 20px auto;
  background: rgb(255, 255, 255, 0.5);
  text-align: center;
  max-height: calc(50vh - 20px);
`;

const StyledPostContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 15px;
  background: rgb(255, 255, 255, 0.5);
  text-align: center;
  overflow: auto;
  margin-top: 10px;
`;

function ProfilePage() {
    const navigate = useNavigate(); // Get the navigate function from React Router
    const [myPosts, setMyPosts] = useState<PostType[]>([]);

    const activeUser = useAppSelector(selectActiveUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            const mPs = await getPostsOfUser(activeUser.username);
            setMyPosts(mPs);
        };

        fetchPosts().then();
    }, [])

    const handleSignOut = () => {
        signOut(); // Perform signout action
        dispatch(logOut())
        navigate("/login"); // Redirect to login page after signout
    };

    return (
        <>
            <Header/>
            <StyledProfileContainer>
                <SignOutButton onClick={handleSignOut}>Sign out</SignOutButton>
                <ProfileHeading>Welcome {activeUser && activeUser.username}</ProfileHeading>
                {activeUser && <UserComponent user={activeUser}/>}
            </StyledProfileContainer>
            <StyledMyPostsContainer>
                <ProfileHeading>My Posts</ProfileHeading>
                <StyledFilterButton selected={false} onClick={() => navigate("/post/create")}>New
                    Post</StyledFilterButton>
                <StyledPostContainer>
                    {myPosts.length > 0 ? myPosts.map((post) => (
                        <Post key={post.id} postId={post.id}  edit={post.authorId === activeUser.username}/>
                    )) : <div>No posts yet, create one!</div>}
                </StyledPostContainer>
            </StyledMyPostsContainer>
        </>
    );
}

export default ProfilePage;
