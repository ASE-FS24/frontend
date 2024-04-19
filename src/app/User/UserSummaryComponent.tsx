import styled from "styled-components";
import {UserSummary} from "./UserType";
import {ReactComponent as FollowSVG} from "../../static/images/person-plus-fill.svg";
import {useAppSelector} from "../hooks";
import {selectActiveUser} from "./LoggedInUserSlice";
import {followUser} from "./UserService";


const StyledUserSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  background-color: #282c34;
  padding: 5px;
  margin: 10px;
  box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, .8);

  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, .8);
  }

  width: calc(33% - 30px);
  min-width: 240px;
`;

const StyledProfilePicture = styled.div<{ url?: string }>`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: auto 10px;
  background: url(${props => props.url ? props.url : process.env.PUBLIC_URL + '/profile.svg'}) center/cover no-repeat;
`;

export const StyledSVGContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin: auto 10px auto auto;

  &:hover {
    cursor: pointer;
    color: #00f8cf;
  }
`;

function UserSummaryComponent({user}: { user: UserSummary }) {
    const loggedInUser = useAppSelector(selectActiveUser);
    return (
        <StyledUserSummaryContainer>
            <StyledProfilePicture></StyledProfilePicture>
            <h3>{user.username}</h3>
            <StyledSVGContainer onClick={() => followUser(loggedInUser.id, user.id)}>
                <FollowSVG style={{width: "35px", height: "35px"}}/>
            </StyledSVGContainer>
        </StyledUserSummaryContainer>
    );
}

export default UserSummaryComponent;