import {useId, useState} from "react";
import {signUp} from "../Util/auth";
import {CognitoSubPage} from "../Register/CognitoUserData";
import {NexusNetSubPage} from "../Register/NexusNetUserData";
import {useDispatch} from "react-redux";
import {setLoggedInUser} from "../User/LoggedInUserSlice";
import {useNavigate} from "react-router-dom";


export default function Register() {
    const userId = useId();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [motto, setMotto] = useState("");
    const [university, setUniversity] = useState("");
    const [bio, setBio] = useState("");
    const [degreeProgram, setDegreeProgram] = useState("");
    const [birthday, setBirthday] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        const newUser = {
            id: userId,
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            motto: motto,
            university: university,
            bio: bio,
            degreeProgram: degreeProgram,
            birthday: birthday,
            profilePicture: "profile.svg",
            followedUsers: []
        }
        dispatch(setLoggedInUser(newUser));
        navigate("/confirm-sign-up");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                {page === 1 && <CognitoSubPage
                    username={username} setUsername={setUsername}
                    email={email} setEmail={setEmail}
                    password={password} setPassword={setPassword}
                    setPage={setPage}/>}
                {page === 2 && <NexusNetSubPage firstName={firstName} setFirstName={setFirstName}
                                                lastName={lastName} setLastName={setLastName}
                                                motto={motto} setMotto={setMotto}
                                                university={university} setUniversity={setUniversity}
                                                bio={bio} setBio={setBio}
                                                degreeProgram={degreeProgram} setDegreeProgram={setDegreeProgram}
                                                birthday={birthday} setBirthday={setBirthday}
                                                setPage={setPage}/>}
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}
