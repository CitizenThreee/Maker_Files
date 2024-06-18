import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material"
import { useEffect, useState } from "react"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FilterBar({ data, setSelection }) {
    const [ categories, setCategories ] = useState( [] );
    const [ tools, setTools ] = useState( [] );
    const [ materials, setMaterials ] = useState( [] );
    const [ time, setTime ] = useState( [] );


    function changeCategories(e) {setCategories(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
    function changeTools(e) {setTools(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
    function changeMaterials(e) {setMaterials(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
    function changeTime(e) {setTime(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}


    useEffect(() => {
        const newData = data.makerFiles.filter(file => {
            let hasCategory = false;
            let hasTool = false;
            let hasMaterial = false;
            let hasTime = false;
            
            for(let i = 0; i < categories.length; i++){
                if(file.category != undefined && file.category == categories[i]){
                    hasCategory = true;
                }
            }
            for(let i = 0; i < tools.length; i++){
                for(let x = 0; x < file.tools.length; x++){
                    if(file.tools[x] != undefined && file.tools[x] == tools[i]){
                        hasTool = true;
                    }
                }
            }
            for(let i = 0; i < materials.length; i++){
                for(let x = 0; x < file.materials.length; x++){
                    if(file.materials[x] != undefined && file.materials[x] == materials[i]){
                        hasMaterial = true;
                    }
                }
                
            }
            for(let i = 0; i < time.length; i++){
                if(file.estTime != undefined){
                    const timeArr = time[i].split('-');
                    const ltime = timeArr.length > 1 ? timeArr[0] : parseInt(timeArr[0]);
                    const utime = timeArr.length > 1 ? timeArr[1] : 2400000;

                    if( parseInt(file.estTime) >= ltime && parseInt(file.estTime) < utime ) {
                        hasTime = true;
                    }
                }
            }

            if(categories.length < 1 && tools.length < 1 && materials.length < 1 && time.length < 1) { return true }
            return (hasCategory || hasTool || hasMaterial || hasTime) ? true : false;
        })

        setSelection(newData);
    }, [ data, categories, tools, materials, time ])

    function filter() {

    }

    return (
        <>
            <Box sx={{padding: "25px", paddingBottom: "0px", display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: 2 }}>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="label">categories</InputLabel>
                    <Select
                        labelId="label" id="select-category" multiple
                        value={categories} onChange={changeCategories} input={<OutlinedInput label="categories" />}
                        MenuProps={MenuProps} >
                        {data.categories != undefined && data.categories.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="label2">tools</InputLabel>
                    <Select
                        labelId="label2" id="select-tools" multiple
                        value={tools} onChange={changeTools} input={<OutlinedInput label="tools" />}
                        MenuProps={MenuProps} >
                        {data.tools != undefined && data.tools.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="label3">materials</InputLabel>
                    <Select
                        labelId="label3" id="select-materials" multiple
                        value={materials} onChange={changeMaterials} input={<OutlinedInput label="materials" />}
                        MenuProps={MenuProps} >
                        {data.materials != undefined && data.materials.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="label4">time</InputLabel>
                    <Select
                        labelId="label4" id="select-time" multiple
                        value={time} onChange={changeTime} input={<OutlinedInput label="time" />}
                        MenuProps={MenuProps} >
                        {data.time != undefined && data.time.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}