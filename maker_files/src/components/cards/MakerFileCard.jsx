import { Card, CardActionArea, CardMedia, Typography, CardContent, IconButton, CardActions } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useUserContext } from "../../context/UserProvider";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function MakerFileCard( {makerFile} ) {
    const { user, handleSetUser } = useUserContext();
    const location = useLocation();

    function RemoveFileFromUser() {
        const newIds = user.fileIds.filter(id => id != makerFile.id)
        const newUser = {...user, fileIds: newIds};
        handleSetUser(newUser);
    }

    function AddFileToUser() {
        const newUser = {...user, fileIds: [...user.fileIds, makerFile.id]};
        handleSetUser(newUser);
    }

    const addButton = 
    <IconButton sx={{backgroundColor: '#eee', height: 35, width: 35, margin: 1}} onClick={AddFileToUser}>
        <AddCircleIcon fontSize="large" color="inherit"/>
    </IconButton>
    const addedButton = 
    <IconButton sx={{backgroundColor: '#eee', height: 35, width: 35, margin: 1}} onClick={RemoveFileFromUser}>
        <CheckCircleIcon fontSize="large" color="primary"/>
    </IconButton>

    const button = user.fileIds && user.fileIds.includes(makerFile.id) ? addedButton : addButton;

    return (
        <>
            <Card sx={{ position: "relative" }}>
                <CardActionArea component={Link} to={{pathname: "/makerfile", search: `?id=${makerFile.id}`}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={makerFile.banner}
                        alt="banner image"
                    />
                    <CardContent sx={{height: '150px', overflow: 'hidden'}}>
                        <Typography noWrap gutterBottom variant="h6" component="div">
                            {makerFile.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {makerFile.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                    <div style={{ position: "absolute", right: 0, top: 0, zIndex: 1}}>
                        {user.email && button}
                    </div>
                </CardActions>
            </Card>
        </>
    )
}