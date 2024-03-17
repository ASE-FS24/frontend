import {User} from "./UserType";
import styled from "styled-components";
import {ReactComponent as ProfileSVG} from "../../static/images/profile.svg";

const StyledUserContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #2d2d2d;
  color: #fff;
`;

const StyledUsername = styled.div`
  font-size: 2rem;
  margin: 5px;
`;

const StyledUserInfo = styled.div`
  font-size: 1.5rem;
  margin: 5px;
`;

const StyledUserBio = styled.div`
  font-size: 1.25rem;
  margin: 5px;
`;

function UserComponent({user}: {user: User}) {
    return (
        <StyledUserContainer>
            <ProfileSVG style={{color: "#000000", width: "45px", height: "45px"}}/>
            <StyledUsername>{user.username}</StyledUsername>
            <StyledUserInfo>{user.firstName}</StyledUserInfo>
            <StyledUserInfo>{user.lastName}</StyledUserInfo>
            <StyledUserInfo>{user.email}</StyledUserInfo>
            <StyledUserInfo>{user.university}</StyledUserInfo>
            <StyledUserInfo>{user.motto}</StyledUserInfo>
            <StyledUserBio>{user.bio}</StyledUserBio>
        </StyledUserContainer>
    )
}

export default UserComponent;