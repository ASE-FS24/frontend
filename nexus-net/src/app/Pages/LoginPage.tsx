import {useState} from "react";
import {signIn} from "../Util/auth";
import {useNavigate} from "react-router-dom";
import {getLoggedInUserThunk} from "../User/LoggedInUserSlice";
import {store} from "../store";
import styled from "styled-components";

const StyledLoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledLogoContainer = styled.div`
  margin-top: -150px;
  position: relative;
`;

const StyledLogo = styled.img`
  width: 400px;
`;

const StyledSlogan = styled.div`
  position: absolute;
  color: #06f3d7;
  top: -25px;
  right: 0;
  font-size: 1.5rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

export const StyledInput = styled.input`
  font-size: 1.5rem;
  padding: 5px;
  border-radius: 5px;
  margin: 15px;
  box-shadow: -5px -5px 10px 2px rgba(0,0,0,.8);
`;

const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledButton = styled.button`
  border: 1px solid #ff0000;
  background-color: #000000;
  color: #ffffff;
  border-radius: 5px;
  width: 150px;
  height: 40px;
  margin: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: -5px -5px 10px 2px rgba(0,0,0,.8);
`;

const StyledError = styled.p`
  color: #ff0000;
`;

const StyledForgotPassword = styled.div`
  font-size: 1rem;
  color: #000000;
  text-decoration: underline;
  
  &:hover{
    cursor: pointer;
  }
`;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("")

        try {
            await signIn(username, password);
            store.dispatch(getLoggedInUserThunk(username));
            navigate("/profile");

        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <StyledLoginContainer>
            <StyledLogoContainer>
                <StyledLogo src="/logo.png"/>
                <StyledSlogan>Enter to create</StyledSlogan>
            </StyledLogoContainer>
            <StyledLogo/>
            <StyledForm onSubmit={onSubmit}>
                <StyledInput id="username"
                       type="text"
                       placeholder="Username"
                       value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
                <StyledInput id="password"
                       type="password"
                       placeholder="Password"
                       value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
                <StyledButtonContainer>
                    <StyledButton onClick={() => navigate("/register")}>Register</StyledButton>
                    <StyledButton type={"submit"}>Login</StyledButton>
                </StyledButtonContainer>
                {error && <StyledError>{error}</StyledError>}
                <StyledForgotPassword
                onClick={() => console.log("Change password!")}>Forgot your password?</StyledForgotPassword>
            </StyledForm>
        </StyledLoginContainer>
    )
}
