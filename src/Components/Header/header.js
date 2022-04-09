import { useState, useContext } from 'react'
import { GlobalStoreContext } from '../../Store'
import { useTheme } from '@mui/material/styles'
import types from '../../Common/Types'
import {
    AppBar, InputAdornment, IconButton, Typography, Menu, TextField,
    Avatar, Button, Tooltip, MenuItem, Grid, FormControl, InputLabel, OutlinedInput
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import CHCIcon from '../Icons/CHCIcon';
import SearchIcon from '@mui/icons-material/Search';

function Header(props) {
    const Navigate = useNavigate();

    const { store } = useContext(GlobalStoreContext);
    const theme = useTheme();

    const appTabs = types.TabType.APP;
    const authTabs = types.TabType.AUTH;

    let pages;
    let settings;

    // In the case of being logged in or not
    if (store.isLoggedIn === false) {
        pages = [appTabs.children.EXPLORE];
        settings = [appTabs.children.PROFILE, authTabs.children.REGISTER, authTabs.children.LOGIN];
    }
    else {
        pages = [appTabs.children.EXPLORE, appTabs.children.SUBSCRIPTIONS];
        settings = [appTabs.children.PROFILE, authTabs.children.LOGOUT];
    }

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (routeName) => {
        setAnchorElNav(null);
        store.reRoute(routeName);
    };

    const handleCloseUserMenu = (routeName) => {
        setAnchorElUser(null);
        store.reRoute(routeName);
    };

    //TODO
    const handleSearchButtonClick = function () {

    }

    //TODO
    const handleSearchTextChange = function () {

    }

    const profileMenuButton =
        <div>
            <Tooltip title="Profile Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {
                    settings.map((setting) => (
                        <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.fullRoute)}>
                            <Typography textAlign="center" sx={{ color: theme.palette.olive_drab_7.main }}>
                                {setting.name}
                            </Typography>
                        </MenuItem>)
                    )
                }
            </Menu>
        </div>

    const tabButtons = pages.map((page) => (
        <Button
            key={page.name}
            onClick={() => handleCloseNavMenu(page.fullRoute)}
            sx={{ paddingInline: 2, fontSize: 17, my: 2, color: theme.palette.ivory.main, display: 'block' }}
            variant="text"
        >
            {page.name.toUpperCase()}
        </Button>
    ))

    const searchBar =
        <TextField
            onChange={handleSearchTextChange}
            size="small"
            variant="outlined"
            sx={{
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 1
            }}
            InputProps={{
                startAdornment:
                    <InputAdornment>
                        <IconButton
                            aria-label="search"
                            onClick={handleSearchButtonClick}
                            edge="start"
                            color="ivory"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
            }}>
        </TextField>


    return (
        <AppBar position="static" style={{
            background: theme.palette.coffee.main,
            color: theme.palette.ivory.main,
            paddingInline: 20
        }} >
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item>
                    <CHCIcon sx={{ overflow: "visible", width: 45, height: 45, marginTop: 0.5, marginRight: 2 }} />
                </Grid>
                {tabButtons}
                <Grid item xs/>
                <Grid item xs={5}>
                    {searchBar}
                </Grid>
                <Grid item xs />
                <Grid item xs/>
                <Grid item>
                    {profileMenuButton}
                </Grid>
            </Grid>
        </AppBar >
    );
}

export default Header;