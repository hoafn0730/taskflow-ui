import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AttachmentItem from './AttachmentItem';

function Attachment({ card, attachments = [] }) {
    return (
        <Box sx={{ ml: '32px', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {attachments.length > 0 &&
                attachments.map((attachment, index) => (
                    <AttachmentItem
                        key={index}
                        id={attachment.id}
                        title={attachment.fileName}
                        image={attachment.fileUrl}
                        cover={card.image}
                    />
                ))}
        </Box>
    );
}

Attachment.propTypes = {
    card: PropTypes.object,
    attachments: PropTypes.array,
};

export default Attachment;
