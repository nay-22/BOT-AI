import { useContext, useState } from 'react';
import { Box, Button, FilledInput, Modal, Rating, TextareaAutosize, TextField, Typography, useTheme } from "@mui/material";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ConversationContext from '../contexts/ConversationContext';

import BookmarkIcon from '@mui/icons-material/Bookmark';

import { styled } from '@mui/system';

// Straight from MUI TextAreaAutosize
const Textarea = styled(TextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;



    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);


const Message = ({ id, message, username, timestamp, roleIcon, rating, saved = false }) => {

    const [isRated, setIsRated] = useState(rating !== undefined ? true : false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [currRating, setCurrRating] = useState(rating || {
        type: '',
        value: ''
    });
    
    const theme = useTheme();
    const { conversations, setConversations } = useContext(ConversationContext);

    const thumbsDown = () => {
        setShowRating(false);
        setShowFeedback(true);
        setCurrRating(prev => ({
            ...prev,
            type: 'negative'
        }));
    }

    const thumbsUp = () => {
        console.log('Positive');
        setCurrRating(prev => ({
            ...prev,
            type: 'positive'
        }));
        setShowRating(prev => !prev);
    }

    const handleRating = (e) => {
        const val = e.target.value;
        console.log(val);
        const r = {
            ...currRating,
            value: val
        }
        setCurrRating(prev => ({
            ...prev,
            value: val
        }));
        setIsRated(true);
        setTimeout(() => putRatingAttribute(r), 500);
    }

    const handleFeedback = () => {
        const r = {
            ...currRating,
            value: feedback
        }
        setCurrRating(prev => ({
            ...prev,
            value: feedback
        }));
        setShowFeedback(false);
        setIsRated(true);
        setTimeout(() => putRatingAttribute(r), 500);
    }

    const putRatingAttribute = (rating) => {
        console.log(id);
        const [conversation] = conversations.filter(item => item.id === id);
        conversation.rating = rating;
        setConversations(prev => prev.map(item => item.id === id ? conversation : item));
        localStorage.setItem('curr', JSON.stringify(conversations));
    }

    return <>
        <Box
            sx={{
                display: 'flex',
                justifyContent: username === 'You' ? 'right' : 'left',
                alignItems: 'center',
                borderRadius: '1em',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: username === 'You' ? 'right' : 'left',
                    alignItems: 'center',
                    gap: '1em',
                    boxShadow: 1,
                    borderRadius: '1em',
                    padding: '1em',
                    backgroundColor: 'secondary.light',
                    flexDirection: username === 'You' ? 'row-reverse' : 'row',
                    width: username !== 'You' ? '100%' : 'fit-content',
                }}
            >
                <Box
                    sx={{
                        alignSelf: 'flex-start',
                    }}
                >
                    <img style={{ boxShadow: theme.palette.mode === 'dark' ? '2px 5px 10px rgb(19, 19, 19)' : '0 2px 5px grey' }} className={'msg-icon'} width='50px' src={roleIcon} alt="" />
                </Box>
                <Box>
                    <Typography textAlign={username === 'You' ? 'right' : 'left'} fontWeight={'bold'}>{username}</Typography>
                    <Typography fontSize={'.9em'}>{message}</Typography>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: username === 'You' ? 'right' : 'left',
                                alignItems: 'center',
                                gap: '1em',
                            }}
                        >
                            <Typography fontSize={'.9em'} color={'text.secondary'}>{timestamp}</Typography>
                            {username !== 'You' && <>
                                {!saved && <>
                                    <Button
                                        sx={{
                                            padding: '.5em 0',
                                            margin: '0',
                                            minWidth: '0',
                                            width: 'fit-content',
                                            borderRadius: '5em'
                                        }}
                                        onClick={thumbsUp}
                                        disabled={isRated}
                                    >
                                        {isRated && currRating.type === 'positive' ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                                    </Button>
                                    <Button
                                        sx={{
                                            padding: '.5em 0',
                                            margin: '0',
                                            minWidth: '0',
                                            width: 'fit-content',
                                            borderRadius: '5em'
                                        }}
                                        onClick={thumbsDown}
                                        disabled={isRated}
                                    >
                                        {isRated && currRating.type === 'negative' ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
                                    </Button>
                                </>}
                            </>}
                        </Box>
                        {!saved && isRated && <Box>
                            {currRating.type === 'positive' && <Typography>
                                <Rating readOnly value={parseInt(currRating.value)} />
                            </Typography>}
                            {currRating.type === 'negative' && <Typography>
                                <b>Feedback</b>: {currRating.value}
                            </Typography>}
                        </Box>}
                        {username !== 'You' && saved && rating && rating.type && <Box>
                            {rating.type === 'positive' && <Typography>
                                <Rating readOnly value={parseInt(rating.value)} />
                            </Typography>}
                            {rating.type === 'negative' && <Typography>
                                <b>Feedback</b>: {rating.value}
                            </Typography>}
                        </Box>}
                        {!isRated && <Box>
                            {currRating.type === 'positive' && showRating && <Rating onChange={(e) => { handleRating(e) }} />}
                            {currRating.type === 'negative' && showFeedback && <>
                                <Modal
                                    open={showFeedback}
                                    onClose={() => setShowFeedback(false)}
                                >
                                    <Box sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 400,
                                        bgcolor: 'primary.dark',
                                        boxShadow: 24,
                                        p: 4,
                                        borderRadius: '1em'
                                    }}>
                                        <Typography variant="h6" component="h2">
                                            Please Provide Feedback.
                                        </Typography>
                                        <Textarea onChange={(e) => setFeedback(e.target.value)} minRows={3} placeholder="Tell us what went wrong. How can we improve the experience?" />
                                        <Button
                                            variant='contained'
                                            sx={{
                                                textTransform: 'none',
                                                float: 'right',
                                                '&.Mui-disabled': {
                                                    backgroundColor: 'text.secondary',
                                                    color: 'white'
                                                }
                                            }}
                                            onClick={() => handleFeedback()}
                                            disabled={feedback.length === 0}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Modal>
                            </>}
                        </Box>}
                    </Box>
                </Box>
            </Box>
        </Box>
    </>;
};

export default Message;