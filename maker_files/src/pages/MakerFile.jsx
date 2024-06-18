import { useSearchParams } from "react-router-dom"
import NavBar from "../components/layout/NavBar"
import { useDataContext } from "../context/DataProvider";
import { Typography, Box, Tabs, Tab, Grid, ListItem, List, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MakerFile() {
    const { data } = useDataContext();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ tabValue, setTabValue ] = useState(0);
    const id = searchParams.get('id');
    const fileData = data.makerFiles.find(file => file.id == id);
    const instructions = fileData ? fileData.instructions.split(/\d+\./).filter(part => part.trim() !== '') : []
    

    return (
        <>
            <NavBar title={fileData ? fileData.title : ""}></NavBar>
            
            <Box sx={{maxWidth: '1000px', margin: 'auto'}}>
                <img src={fileData ? fileData.banner : ""} alt="" width={'100%'} height={'200px'} style={{objectFit: 'cover'}}/>
                <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)} aria-label="basic tabs example">
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="Requirements" {...a11yProps(1)} />
                    <Tab label="Instructions" {...a11yProps(2)} />
                    <Tab label="Files" {...a11yProps(3)} />
                </Tabs>
                <CustomTabPanel value={tabValue} index={0}>
                <Typography variant="p" sx={{fontSize: 18 }}>Estimated Time: {fileData ? fileData.estTime : ""}mins</Typography>
                <Typography variant="p" sx={{fontSize: 18, display: "block", marginTop: '25px'}}>{fileData ? fileData.description : ""}</Typography>
                <Typography variant="p" sx={{fontSize: 18, display: "block", marginTop: '25px' }}>Author: {fileData ? fileData.author : ""}</Typography>
                
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                    <Typography variant="h6">Tools:</Typography>
                    <Box sx={{padding: '25px', display: 'flex', flexWrap: "wrap", gap: 2}}>
                        {fileData ? fileData.tools.map(tool =>
                            <Box key={tool} xs={4} md={2}>
                                <Typography sx={{ p: 1, backgroundColor: '#f1f1f1', borderRadius: 2, textAlign: "center", padding: 2 }}>{tool}</Typography>
                            </Box>
                        ) : "No tools listed"}
                    </Box>

                    <Typography variant="h6">Materials:</Typography>
                    <Box sx={{padding: '25px', display: 'flex', flexWrap: "wrap", gap: 2}}>
                        {fileData ? fileData.materials.map(material =>
                            <Box key={material} xs={4} md={2}>
                                <Typography sx={{ p: 1, backgroundColor: '#f1f1f1', borderRadius: 2, textAlign: "center", padding: 2 }}>{material}</Typography>
                            </Box>
                        ) : "No tools listed"}
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                    <Box sx={{ padding: '10px 5vw', textAlign: 'justify'}} >
                        { instructions.map((section, index) => 
                            <Box key={index}>
                                <Typography sx={{float: "left", marginRight: 2}}>{index + 1}.</Typography>
                                <Typography sx={{marginBottom: 2}}>{section.trim()}</Typography>
                            </Box>
                        ) }
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3}>
                    <Box>
                        <Typography>Coming Soon!</Typography>
                    </Box>
                </CustomTabPanel>
            </Box>
            
        </>
    )
}