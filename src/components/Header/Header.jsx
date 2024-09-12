import { useTranslation } from 'react-i18next';
import { useColorScheme, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageIcon from '@mui/icons-material/Language';
import SyncIcon from '@mui/icons-material/Sync';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Workspaces from './Workspaces';
import Search from './Search';
import Link from '../Link';
import Menu from './Menu/Menu';
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg';
import Inbox from './Inbox';
import Recent from './Recent';
import Starred from './Starred';
import Template from './Template';
import { locales } from '~/utils/i18n';

const MENU_ITEMS = [
    {
        title: 'menu.login',
        to: '/login',
        icon: <Avatar />,
    },

    {
        title: 'menu.appearance.title',
        icon: <LanguageIcon fontSize="small" />,
        separate: true,
        children: {
            title: 'menu.appearance.title',
            data: [
                {
                    type: 'appearance',
                    code: 'light',
                    title: 'menu.appearance.light',
                    icon: <LightModeIcon fontSize="small" />,
                },
                {
                    type: 'appearance',
                    code: 'dark',
                    title: 'menu.appearance.dark',
                    icon: <DarkModeOutlinedIcon fontSize="small" />,
                },
                {
                    type: 'appearance',
                    code: 'system',
                    title: 'menu.appearance.system',
                    icon: <SettingsBrightnessIcon fontSize="small" />,
                },
            ],
        },
    },
    {
        title: 'menu.language',
        icon: <TranslateIcon fontSize="small" />,
        children: {
            title: 'menu.language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: locales['en'],
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: locales['vi'],
                },
            ],
        },
    },
    {
        title: 'menu.settings',
        to: '/settings',
        icon: <SettingsIcon fontSize="small" />,
    },
];

function Header() {
    const { t, i18n } = useTranslation('header');
    const { setMode } = useColorScheme();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const isLogin = false;
    const userMenu = [
        {
            title: 'menu.profile',
            to: '/@hoafn0730',
            icon: <Avatar />,
        },
        {
            title: 'menu.switchAccounts',
            to: '/login?prompt=select_account&continue=',
            icon: <SyncIcon fontSize="small" />,
        },
        ...MENU_ITEMS.slice(1),
        {
            title: 'menu.logout',
            to: '/logout',
            icon: <LogoutIcon fontSize="small" />,
            separate: true,
        },
    ];

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                i18n.changeLanguage(menuItem.code);
                break;
            case 'appearance':
                setMode(menuItem.code);
                break;
            default:
        }
    };

    return (
        <Box
            px={2}
            sx={{
                height: (theme) => theme.app.headerHeight,
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'primary.main',
                overflowX: 'auto',
                '&::-webkit-scrollbar-track': { m: 2 },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    color: 'primary.main',
                }}
            >
                <Link
                    to={'/'}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', textDecoration: 'none' }}
                >
                    <SvgIcon component={TrelloIcon} inheritViewBox />
                    <Typography
                        variant="span"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                        }}
                    >
                        TaskFlow
                    </Typography>
                </Link>
                {isMatch ? (
                    <>
                        <Button endIcon={<KeyboardArrowDownIcon />}>{t('more')}</Button>
                        <Button variant="outlined" sx={{ minWidth: 0, p: 0.8 }}>
                            <AddIcon fontSize="small" />
                        </Button>
                    </>
                ) : (
                    <>
                        <Workspaces />
                        <Recent />
                        <Starred />
                        <Template />
                        <Button variant="outlined" startIcon={<AddIcon />}>
                            {t('create')}
                        </Button>
                    </>
                )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Search />
                <Inbox />
                <Menu items={isLogin ? userMenu : MENU_ITEMS} onChange={handleMenuChange} />
            </Box>
        </Box>
    );
}

export default Header;
