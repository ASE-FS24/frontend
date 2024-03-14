import {useState} from "react";
import {signUp} from "../Util/auth";
import {Link} from "react-router-dom";


export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("")

        try {
            await signUp(username, email, password)
            setSuccess(true)
        } catch (err: any) {
            console.log(err)
            setError(err.message)
        }
    }
    if (success) {
        return (
            <div>
                <h2>SignUp successful!</h2>
                <p>Please check your email for the confirmation code.</p>
                <Link to="/confirm-sign-up">Confirm email</Link>
            </div>
        )
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor={"email"}>Email:</label>
                <input id="email" value={email}
                       onChange={(event) => setEmail(event.target.value)}/>
                <label htmlFor={"username"}>Username:</label>
                <input id="username" value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
                <label htmlFor={"password"}>Password:</label>
                <input id="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
                <button type={"submit"}>Register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}
