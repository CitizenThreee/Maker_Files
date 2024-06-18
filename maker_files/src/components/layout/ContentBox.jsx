import MakerFileCard from "../cards/MakerFileCard"
import { Grid, Typography } from "@mui/material";

export default function ContentBox({makerFiles}) {
    return (
        <> 
            <Grid container spacing={2} sx={{padding: '25px'}}>
                {makerFiles != undefined ? makerFiles.map((file) => 
                    <Grid item key={file.id} xs={12} sm={6} md={3}><MakerFileCard makerFile={file} /></Grid>
                ) : <Typography variant="h6" sx={{ margin: 'auto', marginTop: 10 }}>No Maker Files Found!</Typography>}
            </Grid>
        </>
    )
}