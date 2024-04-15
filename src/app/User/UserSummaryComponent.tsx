import styled from "styled-components";
import {UserSummary} from "./UserType";


const StyledUserSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  background-color: #282c34;
  padding: 5px;
  margin: 10px;
  box-shadow: 5px 5px 10px 2px rgba(0,0,0,.8);
  
    &:hover {
        cursor: pointer;
      box-shadow: 2px 2px 10px 2px rgba(0,0,0,.8);
    }
  width: calc(33% - 30px);
`;

const StyledProfilePicture = styled.div<{ url?: string }>`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: auto 10px;
  background: url(${props => props.url ? props.url : process.env.PUBLIC_URL + '/profile.svg'}) center/cover no-repeat;
`;

function UserSummaryComponent({user}: {user: UserSummary}) {
    return (
        <StyledUserSummaryContainer>
            <StyledProfilePicture></StyledProfilePicture>
            <h3>{user.username}</h3>
        </StyledUserSummaryContainer>
    );
}

export default UserSummaryComponent;