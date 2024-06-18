import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Button, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";

export default function SignupCard( {setLogin} ) {
    const { data, handleSetData } = useDataContext();
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignUp = () => {
        if(!data){ return; }
        const userData = {username: username, email: email, password: password, avatarUrl: "", fileIds: []}
        console.log(data);
        let newData = {...data, users: [...data.users, userData]};
        handleSetData(newData);
        setLogin(true);
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: '100vh' }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: '#dfdfdf', padding: "50px", borderRadius: "10px"}}>
                <Typography variant="h4" sx={{ m: 2 }}>Sign Up</Typography>

                <FormControl sx={{ width: '30ch', m: 2 }}>
                    <InputLabel htmlFor="username">username</InputLabel>
                    <OutlinedInput id="username" type="text" value={username} onChange={(event) => {
                        setUsername(event.target.value);
                    }} label="username"></OutlinedInput>
                </FormControl>

                <FormControl sx={{ width: '30ch', m: 2 }}>
                    <InputLabel htmlFor="email">email</InputLabel>
                    <OutlinedInput id="email" type="text" value={email} onChange={(event) => {
                        setEmail(event.target.value);
                    }} label="email"></OutlinedInput>
                </FormControl>

                <FormControl sx={{ width: '30ch', m: 2 }} variant="outlined">
                    <InputLabel htmlFor="password">password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle vis" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Link onClick={() => { setLogin(true) }} style={{ margin: '10px' }}>Have an account? Login</Link>
                <Button variant="outlined" sx={{ padding: '10px 20px' }} onClick={handleSignUp}>Sign Up</Button>
            </Box>
        </Box>
    )
}