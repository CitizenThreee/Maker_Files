import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Button, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { useUserContext } from "../../context/UserProvider";


export default function LoginCard( {setLogin} ) {
    const { data } = useDataContext();
    const { handleSetUser } = useUserContext();
    const [ showError, setShowError ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        if(!data || !data.users){ return; }
        const userData = data.users.find(user => user.email == email)
        if(userData && userData.password == password) {
            handleSetUser(userData);
            navigate('/');
        }
        else {
            setShowError(true);
        }
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: '100vh' }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: '#dfdfdf', padding: "50px", borderRadius: "10px"}}>
                <Typography variant="h4" sx={{ m: 2 }}>Login</Typography>
                { showError && <Typography variant="p" sx={{ m: 2, color: 'red' }}>*email or password is incorrect*</Typography> }
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
                <Link onClick={() => { setLogin(false)}} style={{ margin: '10px' }}>New? Sign up</Link>
                <Button variant="outlined" sx={{ padding: '10px 20px' }} onClick={handleLogin}>Login</Button>
            </Box>
        </Box>
    )
}