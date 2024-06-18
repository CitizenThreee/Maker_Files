import { createContext, useState, useContext } from "react";

const userContext = createContext();

export function UserProvider(props) {
    const [user, setUser] = useState({})

    function handleSetUser(user) {
        setUser(user);
    }

    return (
        <userContext.Provider value={{user, handleSetUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export function useUserContext() {
    return useContext(userContext);
}