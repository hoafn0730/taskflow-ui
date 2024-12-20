import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import MuiChip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import { useState } from 'react';

const items = [
    {
        icon: <ViewQuiltRoundedIcon />,
        title: 'Boards',
        description:
            'TaskFlow boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”',
        imageLight: 'url("https://res.cloudinary.com/djcqm9suu/image/upload/v1734017447/ugmcfuwmbcim66tyxjgz.jpg")',
        imageDark: 'url("https://res.cloudinary.com/djcqm9suu/image/upload/v1734017447/ugmcfuwmbcim66tyxjgz.jpg")',
    },
    {
        icon: <EdgesensorHighRoundedIcon />,
        title: 'Lists',
        description:
            'The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to TaskFlow.',
        imageLight: 'url("https://mui.com/static/images/templates/templates-images/mobile-light.png")',
        imageDark: 'url("https://mui.com/static/images/templates/templates-images/mobile-dark.png")',
    },
    {
        icon: <DevicesRoundedIcon />,
        title: 'Cards',
        description:
            'The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to TaskFlow.',
        imageLight: 'url("https://mui.com/static/images/templates/templates-images/devices-light.png")',
        imageDark: 'url("https://mui.com/static/images/templates/templates-images/devices-dark.png")',
    },
];

const Chip = styled(MuiChip)(({ theme }) => ({
    variants: [
        {
            props: ({ selected }) => selected,
            style: {
                background: 'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
                color: 'hsl(0, 0%, 100%)',
                borderColor: theme.palette.primary.light,
                '& .MuiChip-label': {
                    color: 'hsl(0, 0%, 100%)',
                },
                ...theme.applyStyles('dark', {
                    borderColor: theme.palette.primary.dark,
                }),
            },
        },
    ],
}));

function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
    if (!items[selectedItemIndex]) {
        return null;
    }

    return (
        <Box
            sx={{
                display: { xs: 'flex', sm: 'none' },
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
                {items.map(({ title }, index) => (
                    <Chip
                        size="medium"
                        key={index}
                        label={title}
                        onClick={() => handleItemClick(index)}
                        selected={selectedItemIndex === index}
                    />
                ))}
            </Box>
            <Card variant="outlined">
                <Box
                    sx={(theme) => ({
                        mb: 2,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: 280,
                        backgroundImage: 'var(--items-imageLight)',
                        ...theme.applyStyles('dark', {
                            backgroundImage: 'var(--items-imageDark)',
                        }),
                    })}
                    style={
                        items[selectedItemIndex]
                            ? {
                                  '--items-imageLight': items[selectedItemIndex].imageLight,
                                  '--items-imageDark': items[selectedItemIndex].imageDark,
                              }
                            : {}
                    }
                />
                <Box sx={{ px: 2, pb: 2 }}>
                    <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                        {selectedFeature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                        {selectedFeature.description}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
}

MobileLayout.propTypes = {
    handleItemClick: PropTypes.func.isRequired,
    selectedFeature: PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.element,
        imageDark: PropTypes.string.isRequired,
        imageLight: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    selectedItemIndex: PropTypes.number.isRequired,
};

export { MobileLayout };

function Features() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };

    const selectedFeature = items[selectedItemIndex];

    return (
        <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
            <Box sx={{ width: { sm: '100%', md: '60%' } }}>
                <Typography component="h2" variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                    Product features
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}>
                    Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of
                    who’s doing what and what needs to get done. Learn more in our guide for getting started.
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row-reverse' },
                    gap: 2,
                }}
            >
                <div>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            gap: 2,
                            height: '100%',
                        }}
                    >
                        {items.map(({ icon, title, description }, index) => (
                            <Box
                                key={index}
                                component={Button}
                                onClick={() => handleItemClick(index)}
                                sx={[
                                    (theme) => ({
                                        p: 2,
                                        height: '100%',
                                        width: '100%',
                                        '&:hover': {
                                            backgroundColor: theme.palette.action.hover,
                                        },
                                    }),
                                    selectedItemIndex === index && {
                                        backgroundColor: 'action.selected',
                                    },
                                ]}
                            >
                                <Box
                                    sx={[
                                        {
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'left',
                                            gap: 1,
                                            textAlign: 'left',
                                            textTransform: 'none',
                                            color: 'text.secondary',
                                        },
                                        selectedItemIndex === index && {
                                            color: 'text.primary',
                                        },
                                    ]}
                                >
                                    {icon}

                                    <Typography variant="h6">{title}</Typography>
                                    <Typography variant="body2">{description}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <MobileLayout
                        selectedItemIndex={selectedItemIndex}
                        handleItemClick={handleItemClick}
                        selectedFeature={selectedFeature}
                    />
                </div>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        width: { xs: '100%', md: '70%' },
                        height: 'var(--items-image-height)',
                    }}
                >
                    <Card
                        variant="outlined"
                        sx={{
                            height: '100%',
                            width: '100%',
                            display: { xs: 'none', sm: 'flex' },
                            pointerEvents: 'none',
                        }}
                    >
                        <Box
                            sx={(theme) => ({
                                m: 'auto',
                                width: 420,
                                height: 500,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundImage: 'var(--items-imageLight)',
                                ...theme.applyStyles('dark', {
                                    backgroundImage: 'var(--items-imageDark)',
                                }),
                            })}
                            style={
                                items[selectedItemIndex]
                                    ? {
                                          '--items-imageLight': items[selectedItemIndex].imageLight,
                                          '--items-imageDark': items[selectedItemIndex].imageDark,
                                      }
                                    : {}
                            }
                        />
                    </Card>
                </Box>
            </Box>
        </Container>
    );
}

export default Features;
