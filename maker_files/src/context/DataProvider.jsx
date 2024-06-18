import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const dataContext = createContext();

export function DataProvider(props) {
    const [data, setData] = useState({users: [], makerFiles: [], categories: [], tools: [], materials: [], time: []})

    function handleSetData(data) {
        setData(data);
    }

    async function FetchData() {
        const newData = {}
        newData.users = await axios.get('./src/data/users.json').then(res => res.data.users);
        newData.makerFiles = await axios.get('./src/data/makerFiles.json').then(res => res.data.files)
        newData.categories = await axios.get('./src/data/makerFiles.json').then(res => res.data.categories)
        newData.tools = await axios.get('./src/data/makerFiles.json').then(res => res.data.tools)
        newData.materials = await axios.get('./src/data/makerFiles.json').then(res => res.data.materials)
        newData.time = await axios.get('./src/data/makerFiles.json').then(res => res.data["time-brackets"])
        setData(newData);
    }

    useEffect(() => {
        FetchData();
    }, [])

    return (
        <dataContext.Provider value={{data, handleSetData}}>
            {props.children}
        </dataContext.Provider>
    )
}

export function useDataContext() {
    return useContext(dataContext);
}