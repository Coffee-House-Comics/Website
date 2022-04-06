import { useState, useContext } from 'react'
import { GlobalStoreContext } from '../../Store'
import { AuthContext } from '../../Auth';
import { useTheme } from '@mui/material/styles'
import types from '../../Common/Types'
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu, Container,
    Avatar, Button, Tooltip, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Navigate } from 'react-router-dom';

function Header(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const theme = useTheme();


    const appTabs = types.TabType.APP;
    const authTabs = types.TabType.AUTH;

    let pages;
    let settings;

    // In the case of being logged in
    if (auth.state == types.authType.GUEST) {
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

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" style={{
            background: theme.palette.coffee.main
        }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        LOGO
                    </Typography>

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
                                pages.map((page) => {
                                    console.log(page);
                                    const route = types.TabType.GENERATE_ROUTE(page.name);
                                    console.log(route);
                                    <MenuItem key={page.name} onClick={() => Navigate(types.TabType.GENERATE_ROUTE(page.name))}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                })
                            }
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default Header;