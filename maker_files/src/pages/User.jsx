import { useEffect, useState } from "react";
import ContentBox from "../components/layout/ContentBox";
import NavBar from "../components/layout/NavBar"
import { useUserContext } from "../context/UserProvider"
import { useDataContext } from "../context/DataProvider";

export default function User() {
    const { user } = useUserContext();
    const { data } = useDataContext();
    const [ userFiles, setUserFiles ] = useState();

    useEffect(() => {
        setUserFiles(data.makerFiles.filter(file => {
            for(let i = 0; i < user.fileIds.length; i++){
                if(file.id == user.fileIds[i]) return true;
            }
            return false;
        }))
    }, [user]) 

    return (
        <>
            <NavBar title={user.username} profile={true}></NavBar>
            <ContentBox makerFiles={ userFiles }></ContentBox>
        </>
    )
}