import {SetStateAction} from "react";


interface AppProps {
    firstName: string;
    setFirstName: React.Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<SetStateAction<string>>;
    motto: string;
    setMotto: React.Dispatch<SetStateAction<string>>;
    university: string;
    setUniversity: React.Dispatch<SetStateAction<string>>;
    bio: string;
    setBio: React.Dispatch<SetStateAction<string>>;
    degreeProgram: string;
    setDegreeProgram: React.Dispatch<SetStateAction<string>>;
    birthday: string;
    setBirthday: React.Dispatch<SetStateAction<string>>;
    setPage: React.Dispatch<SetStateAction<number>>;
}

export function NexusNetSubPage(props: AppProps) {
    return(
        <div>
            <label htmlFor={"firstName"}>First name:</label>
            <input id="firstName" value={props.firstName}
                   onChange={(event) => props.setFirstName(event.target.value)}/>
            <label htmlFor={"lastName"}>Last name:</label>
            <input id="lastName" value={props.lastName}
                   onChange={(event) => props.setLastName(event.target.value)}/>
            <label htmlFor={"motto"}>What is your motto in life?</label>
            <input id="motto" value={props.motto}
                   onChange={(event) => props.setMotto(event.target.value)}/>
            <label htmlFor={"university"}>What university do you study at?</label>
            <input id="university" value={props.university}
                   onChange={(event) => props.setUniversity(event.target.value)}/>
            <label htmlFor={"degreeProgram"}>Degree Program</label>
            <select id="degreeProgram" name="degreeProgram" onChange={(event) => props.setDegreeProgram(event.target.value)}>
                <option label="Please select" value="Please select" selected disabled hidden></option>
                <option label="Bachelors" value="Bachelors"></option>
                <option label="Masters" value="Masters"></option>
                <option label="PhD" value="PhD"></option>
            </select>
            <label htmlFor={"bio"}>Tell us about yourself!</label>
            <textarea id="bio" value={props.bio}
                   onChange={(event) => props.setBio(event.target.value)}/>
            <label htmlFor={"birthday"}>Your date of birth:</label>
            <input id="birthday" value={props.birthday}
                      onChange={(event) => props.setBirthday(event.target.value)}/>
            <button onClick={(event) => props.setPage(1)}>Back</button>
            <button type="submit">Register</button>
        </div>
    )
}