
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"





const pages = ['addtask', 'mytask', 'completedtask'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const { data: session } = useSession()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
        <AppBar position="static">
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
                            <Link href='/' style={{ textDecoration: 'none' }}><MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">home</Typography>
                            </MenuItem></Link>
                            {pages.map((page) => (
                                <Link key={page} href={`/${page}`} style={{ textDecoration: 'none' }}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}

                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link href='/' style={{ textDecoration: 'none' }} ><Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', }}
                        >
                            home
                        </Button></Link>
                        {pages.map((page) => (
                            <Link key={page} href={`/${page}`} style={{ textDecoration: 'none' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block', }}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>


                    {session ? <>
                        Signed in as {session.user.email} <br />
                        <button onClick={() => signOut()}>Sign out</button>
                    </>

                        :

                        <>

                            <Box sx={{ flexGrow: 0 }}>
                                <Link href='/login' style={{ textDecoration: 'none' }}><Button

                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', }}
                                >
                                    login
                                </Button></Link>
                                <Link href='/register' style={{ textDecoration: 'none' }}><Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', }}
                                >
                                    register
                                </Button></Link>
                            </Box>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
