import Box from '@mui/material/Box';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

import Section from '~/components/Section';
import Task from './Task';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { cardService } from '~/services/cardService';
import { boardService } from '~/services/boardService';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        cardService
            .getCards()
            .then((res) => setTasks(res.data.data.filter((card) => card.dueDate && !card.dueComplete)));
        boardService.getBoards().then((res) => setBoards(res.data.data));
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '420px' }}>
                <Section title="Up next" icon={<AccessTimeRoundedIcon fontSize="small" />}>
                    {tasks.length > 0 &&
                        tasks.map((task) => (
                            <Task
                                key={task.id}
                                title={task.title}
                                image={task.cover.fileUrl}
                                slug={task.slug}
                                card={task}
                                setTasks={setTasks}
                            />
                        ))}
                </Section>
            </Box>
            <Box
                sx={{
                    height: '90vh',
                    maxWidth: '342px',
                    overflowY: 'auto',
                    pl: '50px',
                    position: 'sticky',
                    top: '40px',
                    width: '100%',
                }}
            >
                <Section title="Starred" icon={<StarOutlineRoundedIcon fontSize="small" />}>
                    {boards.length > 0 &&
                        boards.map((board) => (
                            <Box key={board.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 0.5 }}>
                                <Box
                                    sx={{ height: '30px', borderRadius: 1 }}
                                    component={'img'}
                                    src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                                    alt=""
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box component={Link} to={'/board/' + board.slug}>
                                        <Typography
                                            variant="h5"
                                            sx={{ fontSize: '16px', fontWeight: '600', lineHeight: '18px' }}
                                        >
                                            {board.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="span" sx={{ fontSize: '12px', lineHeight: '16px' }}>
                                        Hoafn Workspace
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                </Section>
                <Section title="Recently viewed" icon={<AccessTimeRoundedIcon fontSize="small" />}>
                    {boards.length > 0 &&
                        boards.map((board) => (
                            <Box key={board.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 0.5 }}>
                                <Box
                                    sx={{ height: '30px', borderRadius: 1 }}
                                    component={'img'}
                                    src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                                    alt=""
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box component={Link} to={'/board/' + board.slug}>
                                        <Typography
                                            variant="h5"
                                            sx={{ fontSize: '16px', fontWeight: '600', lineHeight: '18px' }}
                                        >
                                            {board.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="span" sx={{ fontSize: '12px', lineHeight: '16px' }}>
                                        Hoafn Workspace
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                </Section>
            </Box>
        </Box>
    );
}

export default Dashboard;
