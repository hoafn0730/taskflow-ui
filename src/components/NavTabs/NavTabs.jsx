import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LinkTab from './LinkTab';

function samePageLinkNavigation(event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

function NavTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (event.type !== 'click' || (event.type === 'click' && samePageLinkNavigation(event))) {
            setValue(newValue);
        }
    };

    return (
        <Box>
            <Tabs
                value={value}
                sx={{
                    '& .MuiTab-root': {
                        justifyContent: 'flex-start',
                        minHeight: 'auto',
                        textTransform: 'none',
                        fontWeight: '500',
                    },
                }}
                orientation="vertical"
                aria-label="nav tabs"
                role="navigation"
                onChange={handleChange}
            >
                <LinkTab icon={<HomeIcon fontSize="small" />} iconPosition="start" label="Home" to="/" />
                <LinkTab icon={<DashboardIcon fontSize="small" />} iconPosition="start" label="Boards" to="/boards" />
                <LinkTab
                    icon={<DashboardCustomizeIcon fontSize="small" />}
                    label="Templates"
                    iconPosition="start"
                    to="/templates"
                />
            </Tabs>
        </Box>
    );
}

export default NavTabs;
