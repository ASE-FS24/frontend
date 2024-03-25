import { User } from "./UserType";
import styled from "styled-components";
import { ReactComponent as ProfileSVG } from "../../static/images/profile.svg";
import { ReactComponent as EditIcon } from "../../static/images/edit_pen.svg"; // Assuming you have an edit icon

const StyledUserContainer = styled.div`
  display: flex;
  align-items: flex-start; /* Align items at the start of the cross axis */
  background-color: #2d2d2d;
  color: #fff;
  padding: 40px; /* Adjust padding */
  border-radius: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
`;

const ProfileIcon = styled(ProfileSVG)`
  width: 100px;
  height: 100px;
  margin-right: 40px; /* Add margin for spacing */
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FieldBox = styled.div`
  background-color: #444;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
  min-width: 100px; /* Adjust the minimum width as needed */
`;


const Separator = styled.div`
  width: 1px;
  height: 100%;
  background-color: #888;
  margin-right: 10px;
`;

const UserInfoText = styled.span`
  white-space: nowrap; /* Prevent line break */
`;

const EditButton = styled(EditIcon)`
  width: 20px;
  height: 20px;
  fill: #fff;
  cursor: pointer;
  opacity: 0.5; /* Default opacity */
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

function UserComponent({ user }: { user: User }) {
  return (
    <StyledUserContainer>
      <ProfileIcon />
      <UserInfoWrapper>
        <UserInfoRow>
          <FieldBox>Username</FieldBox>
          <Separator />
          <UserInfoText>{user.username}</UserInfoText>
          <EditButton />
        </UserInfoRow>
        <UserInfoRow>
          <FieldBox>Name</FieldBox>
          <Separator />
          <UserInfoText>{user.firstName} {user.lastName}</UserInfoText>
          <EditButton />
        </UserInfoRow>
        <UserInfoRow>
          <FieldBox>Email</FieldBox>
          <Separator />
          <UserInfoText>{user.email}</UserInfoText>
          <EditButton />
        </UserInfoRow>
        <UserInfoRow>
          <FieldBox>University</FieldBox>
          <Separator />
          <UserInfoText>{user.university}</UserInfoText>
          <EditButton />
        </UserInfoRow>
        <UserInfoRow>
          <FieldBox>Motto</FieldBox>
          <Separator />
          <UserInfoText>{user.motto}</UserInfoText>
          <EditButton />
        </UserInfoRow>
        <UserInfoRow>
          <FieldBox>Bio</FieldBox>
          <Separator />
          <UserInfoText>{user.bio}</UserInfoText>
          <EditButton />
        </UserInfoRow>
      </UserInfoWrapper>
    </StyledUserContainer>
  );
}

export default UserComponent;
