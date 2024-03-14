import {useAppSelector} from "../hooks";
import styled from "styled-components";
import {selectActiveUser} from "../User/LoggedInUserSlice";
import UserComponent from "../User/UserComponent";
import {signOut} from "../Util/auth";


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
            <button onClick={() => signOut()}>Sign out</button>
        </StyledProfileContainer>
    )
}

export default ProfilePage;