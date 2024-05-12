import {SetStateAction, useState} from "react";
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
    setError: React.Dispatch<SetStateAction<string>>;
}

export function CognitoSubPage(props: AppProps) {
    const [validInput, setValidInput] = useState<boolean>(true);

    function validatePassword(password: string): boolean {
        const regex = /^[\S]+.*[\S]+$/;
        return regex.test(password) && password.length >= 8;
    }

    function settingPassword(newPassword: string): void {
        if (!validatePassword(newPassword)) {
            setValidInput(false);
        } else {
            setValidInput(true);
        }
        if (newPassword === "") {
            setValidInput(true);
        }
        props.setPassword(newPassword);
    }

    const isButtonDisabled = props.username === "" || props.email === "" || props.password === "" || !validInput;

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
                         type="password"
                         placeholder="Password"
                         value={props.password}
                         $valid={validInput}
                         onChange={(event) => settingPassword(event.target.value)}/>
            <StyledButton disabled={isButtonDisabled} onClick={() => props.setPage(2)}>Next</StyledButton>
        </>
    )
}