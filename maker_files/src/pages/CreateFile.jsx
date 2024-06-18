import { Box, Button, FormControl, Grid, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useDataContext } from "../context/DataProvider";
import { useUserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";


export default function CreateFile() {
    const navigate = useNavigate();
    const { data, handleSetData } = useDataContext();
    const { user } = useUserContext();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [banner, setBanner] = useState("");
    const [tools, setTools] = useState("");
    const [materials, setMaterials] = useState("");
    const [estTime, setEstTime] = useState("");

    function handleSetTitle(e) {
        if(e.target.value.length < 31){
            setTitle(e.target.value);
        }
    }

    function handleCreate() {
        const newId = data.makerFiles[data.makerFiles.length -1].id + 1;
        const newTools = tools.split(',').map(item => item.trim());
        const newMaterials = materials.split(',').map(item => item.trim());
        const newFile = {
            id : newId,
            title : title,
            description : description,
            author: user.username,
            category : category,
            tools : newTools,
            materials: newMaterials,
            estTime: estTime,
            rating: 0,
            instructions : instructions,
            files : [],
            banner : banner
        }

        handleSetData({...data, makerFiles: [...data.makerFiles, newFile]});
        navigate('/')
    }

    return (
        <>
            <Grid container sx={{backgroundColor: '#f3f3f3', maxWidth: '1000px', margin: 'auto'}}>
                <Grid item xs={12} md={5} sx={{padding: 2}}>
                    <TextField id="title" label="Title" fullWidth value={title} onChange={handleSetTitle}/>
                </Grid>
                <Grid item xs={12} md={7} sx={{padding: 2}}>
                    <TextField id="category" label="Category" fullWidth value={category} onChange={(e) => setCategory(e.target.value)}/>
                </Grid>
                <Grid item xs={12} md={9} sx={{padding: 2}}>
                    <TextField id="tools" label="Tools" fullWidth value={tools} onChange={(e) => setTools(e.target.value)}
                    helperText="List the tools used seperated by commas (e.g. '3d-printer, craft-knife')"/>
                </Grid>
                <Grid item xs={12} md={3} sx={{padding: 2}}>
                    <TextField id="estTime" label="Est Time" fullWidth value={estTime} onChange={(e) => setEstTime(e.target.value)}
                    helperText="Time in minutes"/>
                </Grid>
                <Grid item xs={12} sx={{padding: 2}}>
                    <TextField id="materials" label="Materials" fullWidth value={materials} onChange={(e) => setMaterials(e.target.value)}
                    helperText="List the materials used seperated by commas (e.g. 'pla, glue, resin')"/>
                </Grid>
                <Grid item xs={12} sx={{padding: 2}}>
                    <TextField id="description" label="Description" fullWidth value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Grid>
                <Grid item xs={12} sx={{padding: 2}}>
                    <TextField id="instructions" label="Instructions" fullWidth multiline rows={8} value={instructions} onChange={(e) => setInstructions(e.target.value)}
                    helperText="Write instructions denoted by numbers + fullstop (e.g. '1. first task 2. second task')"/>
                </Grid>
                <Grid item xs={12} sx={{padding: 2}}>
                    <TextField id="banner" label="Banner URL" fullWidth value={banner} onChange={(e) => setBanner(e.target.value)}/>
                </Grid>
                <Button id="create" variant="outlined" sx={{margin: '20px auto', marginBottom: "50px", width: '200px', height: '50px'}} onClick={handleCreate}>Create</Button>
            </Grid>
        </>
    )
}