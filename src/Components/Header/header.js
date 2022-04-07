import { useState, useContext } from 'react'
import { GlobalStoreContext } from '../../Store'
import { useTheme } from '@mui/material/styles'
import types from '../../Common/Types'
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu, Container,
    Avatar, Button, Tooltip, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

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

        if (routeName) {
            console.log(routeName)
            const route = types.TabType.GENERATE_ROUTE(routeName);
            if (route) {
                console.log();
                Navigate(route);
            }
        }

    };

    const handleCloseUserMenu = (routeName) => {
        setAnchorElUser(null);

        if (routeName) {
            const route = types.TabType.GENERATE_ROUTE(routeName);
            if (route)
                Navigate(route);
        }
    };

    return (
        <AppBar position="static" style={{
            background: theme.palette.coffee.main,
            color: theme.palette.ivory.main
        }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {
                                pages.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={() => handleCloseNavMenu(page.name)}
                                    >
                                        <Typography sx={{ color: theme.palette.olive_drab_7.main }} textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        { // The Buttons that appear in the app bar in full screen
                            pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: theme.palette.ivory.main, display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            ))
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                    <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.name)}>
                                        <Typography textAlign="center" sx={{ color: theme.palette.olive_drab_7.main }}>
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>)
                                )
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default Header;