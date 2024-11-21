import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import { fetchBoardDetail } from '~/store/actions/boardAction';

function Board() {
    const isLoading = useSelector((state) => state.board.isLoading);
    const { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBoardDetail(slug));
    }, [dispatch, slug]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    height: '100vh',
                    width: '100vw',
                }}
            >
                <CircularProgress />
                Board Loading...
            </Box>
        );
    }

    return (
        <Box>
            <BoardBar />
            <BoardContent />
        </Box>
    );
}

export default Board;
