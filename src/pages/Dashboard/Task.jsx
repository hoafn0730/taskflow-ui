import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Link from '~/components/Link';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

import { cardService } from '~/services/cardService';

function Task({ title, image, slug, card, setTasks }) {
    const location = useLocation();

    const handleDueComplete = () => {
        const newCard = cloneDeep(card);

        cardService.updateCard(card?.id, {
            title: card?.title,
            dueComplete: true,
        });

        setTasks((prev) => prev.filter((card) => card.id !== newCard?.id));
    };

    const handleDismiss = () => {
        const newCard = cloneDeep(card);

        cardService.updateCard(card?.id, {
            title: card?.title,
            dueDate: null,
            dueComplete: false,
            dueReminder: -1,
        });

        setTasks((prev) => prev.filter((card) => card.id !== newCard?.id));
    };

    return (
        <Card sx={{ maxWidth: 420, position: 'relative', mb: 2 }}>
            <CardMedia
                sx={{ height: 100 }}
                // image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                image={image}
                title={title}
            />
            <CardContent
                sx={{
                    position: 'absolute',
                    inset: '8px 8px auto 8px',
                    bgcolor: 'common.white',
                    borderRadius: 1,
                }}
            >
                <Link
                    to={'/card/' + slug}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        textDecoration: 'none',
                        justifyContent: 'center',
                    }}
                    state={{ backgroundLocation: location }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: '16px',
                        }}
                    >
                        {title}
                    </Typography>
                    <Box>
                        <Typography
                            variant="span"
                            sx={{
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                color: 'orange',
                                width: 'fit-content',
                                p: '2px',
                            }}
                        >
                            <AccessTimeRoundedIcon fontSize="small" /> {dayjs(card?.dueDate).format('MMM D, h:mm A')}
                        </Typography>
                    </Box>
                </Link>
            </CardContent>
            <CardActions sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography
                    variant="span"
                    sx={{
                        fontSize: '14px',
                        fontWeight: 400,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        width: 'fit-content',
                        p: '2px',
                        mb: 1,
                    }}
                >
                    <AccessTimeRoundedIcon fontSize="small" /> Due {dayjs(card?.dueDate).format('MMM D, h:mm A')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <Button startIcon={<CheckRoundedIcon />} onClick={handleDueComplete}>
                        Complete
                    </Button>
                    <Button
                        startIcon={<CloseRoundedIcon />}
                        sx={{
                            '&:hover': {
                                color: 'warning.dark',
                            },
                        }}
                        onClick={handleDismiss}
                    >
                        Dismiss
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}

Task.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    slug: PropTypes.string,
    card: PropTypes.object,
    setTasks: PropTypes.func,
};

export default Task;
