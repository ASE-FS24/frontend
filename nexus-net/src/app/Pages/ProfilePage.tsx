import {useAppSelector} from "../hooks";
import styled from "styled-components";
import {selectActiveUser} from "../User/LoggedInUserSlice";
import UserComponent from "../User/UserComponent";


const StyledProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

function ProfilePage() {
    const activeUser = useAppSelector(selectActiveUser);

    return (
        <StyledProfileContainer>
            {activeUser && <UserComponent user={activeUser}/>}
        </StyledProfileContainer>
    )
}

export default ProfilePage;