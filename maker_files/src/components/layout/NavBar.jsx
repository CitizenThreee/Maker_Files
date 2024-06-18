import { Box, AppBar, Button, Toolbar, styled, InputBase, alpha, Typography, IconButton } from '@mui/material';
import { useUserContext } from '../../context/UserProvider';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function NavBar({search, searchValue, setSearchValue, title, profile}) {
    const { user } = useUserContext();
    const rightLink = 
    <IconButton component={Link} to='/user' color="inherit" aria-label="home">
        <AccountCircleIcon fontSize='large' />
    </IconButton>
    const newFile = <Button component={Link} to='/create' color='inherit'>+ Create</Button>

    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: "#222"}}>
                    <Box> 
                        <IconButton component={Link} to='/' color="inherit" aria-label="home">
                            <HomeIcon fontSize='large' />
                        </IconButton>
                    </Box>
                    {search ? <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            //value={searchValue}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchValue}
                            onChange={(e) => {setSearchValue(e.target.value)}}
                        />
                    </Search> : null}
                    {title ? <Typography variant={'h5'} sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{title}</Typography> : null}
                    {profile ? newFile : rightLink}
                </Toolbar>
            </AppBar>
        </Box>
    )
}