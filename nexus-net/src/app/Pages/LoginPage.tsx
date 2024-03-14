import {useState} from "react";
import {signIn} from "../Util/auth";
import {useNavigate} from "react-router-dom";
import {getLoggedInUserThunk} from "../User/LoggedInUserSlice";
import {store} from "../store";


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
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor={"username"}>Username:</label>
                <input id="username"
                       type="text"
                       placeholder="Username"
                       value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
                <label htmlFor={"password"}>Password:</label>
                <input id="password"
                       type="password"
                       placeholder="Password"
                       value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
                <button type={"submit"}>Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}
