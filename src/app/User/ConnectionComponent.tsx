import styled from "styled-components";
import {UserSummary} from "./UserType";
import {followUser, unfollowUser} from "./UserService";
import {StyledSVGContainer} from "./UserSummaryComponent";
import {useAppSelector} from "../hooks";
import {selectActiveUser} from "./LoggedInUserSlice";
import {ReactComponent as UnfollowSVG} from "../../static/images/person-dash-fill.svg";


const StyledConnection = styled.div`
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

  width: calc(50% - 30px);
`;

const StyledProfilePicture = styled.div<{ url?: string }>`
  border-radius: 50%;
  width: 75px;
  height: 75px;
  margin: auto 10px;
  background: url(${props => props.url ? props.url : process.env.PUBLIC_URL + '/profile.svg'}) center/cover no-repeat;
`;

function ConnectionComponent({connection}: { connection: UserSummary }) {
    const loggedInUser = useAppSelector(selectActiveUser);
    return (
        <StyledConnection>
            <StyledProfilePicture></StyledProfilePicture>
            <h3>{connection.username}</h3>
            <StyledSVGContainer onClick={() => {
                unfollowUser(loggedInUser.id, connection.id).then(() => window.location.reload())
            }}>
                <UnfollowSVG style={{width: "35px", height: "35px"}}/>
            </StyledSVGContainer>
        </StyledConnection>
    );
}

export default ConnectionComponent;