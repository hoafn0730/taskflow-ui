import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import BoltIcon from '@mui/icons-material/Bolt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { capitalizeFirstLetter } from '~/utils/formatters';
import { useState } from 'react';
import Invite from './Invite/Invite';

const MENUS_STYLES = {
    color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.common.white : 'primary.main'),
    bgcolor: (theme) => theme.palette.mode !== 'dark' && theme.palette.common.white,
    border: 'none',
    px: '5px',
    '& .MuiSvgIcon-root': {
        color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.common.white : 'primary.main'),
    },
};

function BoardBar() {
    const { t } = useTranslation('board');
    const [isOpen, setIsOpen] = useState(false);
    const board = useSelector((state) => state.board.boardData);

    return (
        <Box
            px={2}
            sx={{
                width: '100%',
                height: (theme) => theme.app.boardBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                overflowX: 'auto',
                '&::-webkit-scrollbar-track': { m: 2 },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title={board?.description}>
                    <Chip sx={MENUS_STYLES} icon={<DashboardIcon />} label={board?.title} onClick={() => {}} />
                </Tooltip>
                <Chip
                    sx={MENUS_STYLES}
                    icon={<VpnLockIcon />}
                    label={capitalizeFirstLetter(board?.type)}
                    onClick={() => {}}
                />
                <Chip sx={MENUS_STYLES} icon={<BoltIcon />} label={t('boardBar.automation')} onClick={() => {}} />
                <Chip sx={MENUS_STYLES} icon={<FilterListIcon />} label={t('boardBar.filter')} onClick={() => {}} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                    variant="outlined"
                    sx={{
                        color: (theme) => (theme.palette.mode === 'dark' ? theme.palette.common.white : 'primary.main'),
                        borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? theme.palette.common.white : 'primary.main',
                        '&:hover': {
                            color: (theme) => theme.palette.mode === 'dark' && theme.palette.primary.main,
                            backgroundColor: (theme) => theme.palette.mode === 'dark' && theme.palette.primary['50'],
                        },
                    }}
                    startIcon={<PersonAddIcon />}
                    onClick={() => setIsOpen(true)}
                >
                    {t('boardBar.invite')}
                </Button>

                <AvatarGroup
                    max={3}
                    sx={{
                        '& .MuiAvatar-root': {
                            borderColor: (theme) => theme.palette.common.white,
                            borderWidth: '1px',
                            color: (theme) => theme.palette.common.white,
                            width: '34px',
                            height: '34px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            bgcolor: '#a4b0be',
                            '&:first-of-type': {
                                bgcolor: '#a4b0be',
                            },
                        },
                    }}
                >
                    {/* <Tooltip title={'Hoafn0730'}>
                        <Avatar alt={'hoafn'} src={''} />
                    </Tooltip> */}

                    {board?.members?.filter((member) => member.role).length > 0 &&
                        board?.members
                            ?.filter((member) => member.role)
                            .map((member) => (
                                <Tooltip key={member.id} title={member.user.fullName}>
                                    <Avatar alt={member.user.fullName} src={member.user.avatar} />
                                </Tooltip>
                            ))}
                </AvatarGroup>

                <Button sx={{ p: '6px', minWidth: 'auto' }}>
                    <MoreHorizIcon />
                </Button>
            </Box>

            <Invite members={board?.members} open={isOpen} onClose={() => setIsOpen(false)} />
        </Box>
    );
}

BoardBar.propTypes = {
    boardData: PropTypes.object,
};

export default BoardBar;
