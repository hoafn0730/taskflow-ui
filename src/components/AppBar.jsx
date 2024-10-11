import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Logo from '~/components/Logo';
import config from '~/config';
import { useState } from 'react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

function AppBar() {
    const [open, setOpen] = useState(false);
    const currentURL = window.location.href;

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <MuiAppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}>
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0, gap: 1 }}>
                        <Logo to={config.paths.home} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button variant="text" size="small" href="/home#features">
                                Features
                            </Button>
                            <Button variant="text" size="small" href="/home#testimonials">
                                Testimonials
                            </Button>
                            <Button variant="text" size="small" href="/home#highlights">
                                Highlights
                            </Button>
                            <Button variant="text" size="small" href="/home#pricing">
                                Pricing
                            </Button>
                            <Button variant="text" size="small" sx={{ minWidth: 0 }} href="/home#faq">
                                FAQ
                            </Button>
                            <Button variant="text" size="small" sx={{ minWidth: 0 }} href="/blog">
                                Blog
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            color="primary"
                            variant="text"
                            size="small"
                            href={`${import.meta.env.VITE_APP_SSO_LOGIN}?serviceURL=${encodeURIComponent(
                                window.location.origin,
                            )}`}
                        >
                            Sign in
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            href={`http://localhost:3000/register?continue=${encodeURIComponent(currentURL)}`}
                        >
                            Sign up
                        </Button>
                    </Box>
                    <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <Divider sx={{ my: 3 }} />
                                <MenuItem>Features</MenuItem>
                                <MenuItem>Testimonials</MenuItem>
                                <MenuItem>Highlights</MenuItem>
                                <MenuItem>Pricing</MenuItem>
                                <MenuItem>FAQ</MenuItem>
                                <MenuItem>Blog</MenuItem>
                                <MenuItem>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        fullWidth
                                        href={`http://localhost:3000/register?continue=${encodeURIComponent(
                                            currentURL,
                                        )}`}
                                    >
                                        Sign up
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        fullWidth
                                        href={`http://localhost:3000/login?continue=${encodeURIComponent(currentURL)}`}
                                    >
                                        Sign in
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </MuiAppBar>
    );
}

export default AppBar;