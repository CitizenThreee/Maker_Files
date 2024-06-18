import { useState } from "react";
import LoginCard from "../components/cards/LoginCard";
import SignupCard from "../components/cards/SignupCard";

export default function Login() {
    const [ login, setLogin ] = useState(true)

    return (
        <>
            { login ? <LoginCard setLogin={setLogin} ></LoginCard> : <SignupCard setLogin={setLogin} ></SignupCard> }
        </>
    )
}