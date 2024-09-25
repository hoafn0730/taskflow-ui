import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { boardService } from '~/services/boardService';
import { cardService } from '~/services/cardService';
import { columnService } from '~/services/columnService';

export const fetchBoardDetail = createAsyncThunk('board/fetchBoardDetail', async (boardId) => {
    const res = await boardService.getBoard(boardId);

    return res.data;
});

export const moveColumns = createAsyncThunk('board/moveColumns', async ({ columnOrderIds }, thunkAPI) => {
    const state = thunkAPI.getState();
    const boardId = state?.board?.boardData?.id;
    boardService.updateBoard(boardId, { columnOrderIds });

    return { columnOrderIds };
});

export const moveCardInSameColumn = createAsyncThunk(
    'board/moveCardInSameColumn',
    async ({ columnId, orderedCards, orderedCardIds }) => {
        columnService.updateColumn(columnId, { cardOrderIds: orderedCardIds });

        return { columnId, orderedCards, orderedCardIds };
    },
);

export const moveCardDifferentColumn = createAsyncThunk(
    'board/moveCardDifferentColumn',
    async ({ currentCardId, prevColumnId, nextColumnId, orderedColumns }) => {
        let prevCardOrderIds = orderedColumns.find((c) => c.id === prevColumnId)?.cardOrderIds;
        const nextCardOrderIds = orderedColumns.find((c) => c.id === nextColumnId)?.cardOrderIds;

        if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = [];

        await boardService.moveCardToDifferentColumn({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds,
        });

        return { orderedColumns };
    },
);

export const createNewColumn = createAsyncThunk('board/createNewColumn', async (data) => {
    const createdColumn = await columnService.createNewColumn(data);

    return { createdColumn };
});

export const deleteColumn = createAsyncThunk('board/deleteColumn', async ({ columnId }, thunkAPI) => {
    columnService.deleteColumn(columnId).then((res) => toast.success(res.message));
    return { columnId };
});

export const createNewCard = createAsyncThunk('board/createNewCard', async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const boardId = state?.board?.boardData?.id;
    const createdCard = await cardService.createNewCard({ ...data, boardId: boardId });

    return { createdCard };
});

export const archiveCard = createAsyncThunk('board/archiveCard', async ({ columnId, cardId }) => {
    const res = await cardService.updateCard(cardId, { archived: true }).then((res) => toast.success(res));

    return { columnId, cardId };
});

export const deleteCard = createAsyncThunk('board/deleteCard', async ({ columnId, cardId }) => {
    const res = await cardService.deleteCard(cardId).then((res) => toast.success(res));

    return { columnId, cardId };
});