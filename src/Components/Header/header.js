import { useState, useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import types from '../../Common/Types'
import {
    AppBar, InputAdornment, IconButton, Typography, Menu, TextField,
    Avatar, Button, Tooltip, MenuItem, Grid, FormControl, InputLabel, OutlinedInput
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CHCIcon from '../Icons/CHCIcon';
import SearchIcon from '@mui/icons-material/Search';
import { GlobalStoreContext } from '../../Store';


function Header(props) {

    const { store } = useContext(GlobalStoreContext);
    const theme = useTheme();
    const [ searchText, setSearchText ] = useState("")

    const appTabs = types.TabType.APP;
    const authTabs = types.TabType.AUTH;

    const mode = store.app.toUpperCase();

    let pages;
    let settings;

    // In the case of being logged in or not
    if (store.isLoggedIn === false) {
        pages = [appTabs.children.EXPLORE];
        settings = [authTabs.children.REGISTER, authTabs.children.LOGIN];
    }
    else {
        pages = [appTabs.children.EXPLORE, appTabs.children.SUBSCRIPTIONS];
        settings = [appTabs.children.PROFILE, authTabs.children.LOGOUT];
    }

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElLogo, setAnchorElLogo] = useState(null);

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

    const handleCloseUserMenu = (e, routeName) => {
        setAnchorElUser(null);

        // We have to handle a few special cases - like how logout actually requires more than a redirect
        if (routeName === types.TabType.AUTH.children.LOGOUT.fullRoute) {
            console.log("We are trying to log out...", routeName);
            store.logout();
            routeName = types.TabType.AUTH.children.LOGIN.fullRoute;
        }
        else if (routeName === types.TabType.APP.children.PROFILE.fullRoute) {
            console.log("View my profile,", store.getMyId());
            store.reRoute(routeName, store.getMyId());

            return;
        }

        if (routeName) {
            console.log("Route name:", routeName);
            store.reRoute(routeName);
        }
    };

    const handleSearchButtonClick = function () {
        if(searchText){
            store.reRoute(types.TabType.APP.children.SEARCH.fullRoute, searchText)
        } else {
            store.reRoute(types.TabType.APP.children.SEARCH.fullRoute, "")
        }
    }

    const handleSearchTextChange = function (e) {
        if(e.target.value.includes("\n")){
            handleSearchButtonClick()
        } else {
            setSearchText(e.target.value)
        }
    }

    const handleCreateAppPost = function () {
        console.log("Trying to create a post...");
        store.newContent();
    }

    const handleOpenLogoMenu = function (event) {
        setAnchorElLogo(event.currentTarget);
    }

    const handleCloseLogoMenu = function () {
        setAnchorElLogo(null);
    }

    const handleSwitchAppMode = function () {
        store.switchAppMode();
        handleCloseLogoMenu();
    }

    const logoMenu = (
        <div>
            <CHCIcon
                onClick={handleOpenLogoMenu}
                sx={{
                    cursor: "pointer",
                    overflow: "visible",
                    width: 45,
                    height: 45,
                    marginTop: 0.5,
                    marginRight: 2
                }}
            />
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElLogo}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElLogo)}
                onClose={handleCloseLogoMenu}
            >
                <MenuItem key={"LOGO-MENU-SHADOW-IS-CUTE"} onClick={handleSwitchAppMode}>
                    <Typography textAlign="center" sx={{ color: theme.palette.olive_drab_7.main }}>
                        {(store.app.toUpperCase() === "COMICS") ? "Switch to Story Café" : "Switch to Comic Café"}
                    </Typography>
                </MenuItem>
            </Menu>
        </div>
    );

    const profileAvatar = (store.isLoggedIn) ? <Avatar alt="Profile" src={store.user.profileImage}/> : <Avatar alt="Profile" />

    const profileMenuButton =
        <div>
            <Tooltip title="Profile Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {profileAvatar}
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
                onClose={(e) => {handleCloseUserMenu(e, null)}}
            >
                {
                    settings.map((setting) => (
                        <MenuItem key={setting.name} onClick={(e) => handleCloseUserMenu(e, setting.fullRoute)}>
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
            value={searchText}
            sx={{
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 1
            }}
            InputProps={{
                startAdornment:
                    <InputAdornment position='start' >
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

    const singular = (store.app === "Comics") ? "Comic" : "Story";

    return (
        <AppBar position="static" style={{
            background: theme.palette.coffee.main,
            color: theme.palette.ivory.main,
            paddingInline: 20
        }} >
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item>
                    {logoMenu}
                </Grid>
                <Grid item sx={{
                    paddingRight: "20px",
                    borderRight: "2px solid " + theme.palette.ivory.main,
                    paddingTop: 0.7
                }}>
                    <Typography variant="h4">{mode}</Typography>
                </Grid>
                {tabButtons}
                <Grid item lg />
                <Grid item xs lg={5} sx={{ marginInline: "20px" }}>
                    {searchBar}
                </Grid>
                <Grid item lg />
                <Grid item lg />
                <Grid item xs="auto" >
                    <button className='create-app' onClick={handleCreateAppPost}>
                        {"+ Create " + singular}
                    </button>
                </Grid>
                <Grid item>
                    {profileMenuButton}
                </Grid>
            </Grid>
        </AppBar >
    );
}

export default Header;