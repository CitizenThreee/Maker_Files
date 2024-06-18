import { Box } from "@mui/material"
import NavBar from "../components/layout/NavBar"
import ContentBox from "../components/layout/ContentBox"
import { useDataContext } from "../context/DataProvider"
import { useEffect, useState } from "react";
import FilterBar from "../components/layout/FilterBar";

export default function Home() {
    const { data } = useDataContext();
    const [ filterSelection, setFilterSelection ] = useState();
    const [ searchValue, setSearchValue ] = useState("");
    const [ selection, setSelection ] = useState();

    useEffect(() => {
        const newSelection = filterSelection ? filterSelection.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())) : data.makerFiles;
        setSelection(newSelection);
    }, [ searchValue, filterSelection ])

    return(
        <Box>
            <NavBar search={true} searchValue={searchValue} setSearchValue={setSearchValue} ></NavBar>
            <FilterBar data={ data } setSelection={setFilterSelection}></FilterBar>
            <ContentBox makerFiles={selection}></ContentBox>
        </Box>
    )
}