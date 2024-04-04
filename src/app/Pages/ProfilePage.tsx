import { useAppSelector } from "../hooks";
import styled from "styled-components";
import { selectActiveUser } from "../User/LoggedInUserSlice";
import UserComponent from "../User/UserComponent";
import { signOut } from "../Util/auth";
import { useNavigate } from "react-router-dom";


const StyledProfileContainer = styled.div`
  position: relative; /* Add relative positioning */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;

const ProfileHeading = styled.h2`
  font-size: 20px;
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

function ProfilePage() {
  const navigate = useNavigate(); // Get the navigate function from React Router

  const activeUser = useAppSelector(selectActiveUser);

  const handleSignOut = () => {
    signOut(); // Perform signout action
    navigate("/login"); // Redirect to login page after signout
  };

  return (
    <StyledProfileContainer>
      <SignOutButton onClick={handleSignOut}>Sign out</SignOutButton>
      <ProfileHeading>Welcome {activeUser && activeUser.name}</ProfileHeading>
      {activeUser && <UserComponent user={activeUser} />}
    </StyledProfileContainer>
  );
}

export default ProfilePage;
