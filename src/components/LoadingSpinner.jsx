import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function LoadingSpinner({ caption }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                width: '100%',
                height: '100vh',
            }}
        >
            <CircularProgress />
            <Typography>{caption}</Typography>
        </Box>
    );
}

LoadingSpinner.propTypes = {
    caption: PropTypes.string.isRequired,
};

export default LoadingSpinner;