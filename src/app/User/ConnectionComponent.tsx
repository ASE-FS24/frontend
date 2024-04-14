import styled from "styled-components";


const StyledConnection = styled.div`
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
`;

const StyledProfilePicture = styled.div<{ url?: string }>`
  border-radius: 50%;
  width: 75px;
  height: 75px;
  margin: auto 10px;
  background: url(${props => props.url ? props.url : process.env.PUBLIC_URL + '/profile.svg'}) center/cover no-repeat;
`;

function ConnectionComponent(connection: { id: string, username: string, profilePictureUrl: string }) {
    return (
        <StyledConnection>
            <StyledProfilePicture></StyledProfilePicture>
            <h1>{connection.username}</h1>
        </StyledConnection>
    );
}

export default ConnectionComponent;