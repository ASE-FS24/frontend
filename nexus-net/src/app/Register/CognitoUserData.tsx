import {SetStateAction} from "react";
import {StyledButton, StyledInput} from "../Pages/LoginPage";

interface AppProps {
    username: string;
    setUsername: React.Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<SetStateAction<string>>;
    setPage: React.Dispatch<SetStateAction<number>>;
    disabled: boolean;
}

export function CognitoSubPage(props: AppProps) {
    return (
        <>
            <StyledInput id="email"
                         placeholder="Email"
                         value={props.email}
                         onChange={(event) => props.setEmail(event.target.value)}/>
            <StyledInput id="username"
                         placeholder="Username"
                         value={props.username}
                         onChange={(event) => props.setUsername(event.target.value)}/>
            <StyledInput id="password"
                         placeholder="Password"
                         value={props.password}
                         onChange={(event) => props.setPassword(event.target.value)}/>
            <StyledButton disabled={props.disabled} onClick={() => props.setPage(2)}>Next</StyledButton>
        </>
    )
}