import {SetStateAction} from "react";


interface AppProps {
    username: string;
    setUsername: React.Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<SetStateAction<string>>;
    setPage: React.Dispatch<SetStateAction<number>>;
}

export function CognitoSubPage(props: AppProps) {
    return(
        <div>
            <label htmlFor={"email"}>Email:</label>
            <input id="email" value={props.email}
                   onChange={(event) => props.setEmail(event.target.value)}/>
            <label htmlFor={"username"}>Username:</label>
            <input id="username" value={props.username}
                   onChange={(event) => props.setUsername(event.target.value)}/>
            <label htmlFor={"password"}>Password:</label>
            <input id="password" value={props.password}
                   onChange={(event) => props.setPassword(event.target.value)}/>
            <button onClick={() => props.setPage(2)}>Next</button>
        </div>
    )
}