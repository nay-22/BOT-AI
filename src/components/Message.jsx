import { Box, Button, Typography } from "@mui/material";

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const Message = ({ message, username, timestamp, roleIcon }) => {
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
                    padding: '10px',
                    boxShadow: '0 0 10px grey',
                    borderRadius: '1em',
                    padding: '1em',
                    backgroundColor: 'secondary.light',
                    flexDirection: username === 'You' ? 'row-reverse' : 'row'
                }}
            >
                <Box 
                    sx={{
                        alignSelf: 'flex-start',
                    }}
                >
                    <img className={'msg-icon'} width='50px' src={roleIcon} alt="" />
                </Box>
                <Box>
                    <Typography fontWeight={'bold'}>{username}</Typography>
                    <Typography fontSize={'.9em'}>{message}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                        }}
                    >
                        <Typography fontSize={'.9em'} color={'grey'}>{timestamp}</Typography>
                        {username !== 'You' && <>
                            <Button><ThumbUpOffAltIcon /></Button>
                            <Button><ThumbDownOffAltIcon /></Button>
                        </>}
                    </Box>
                </Box>
            </Box>
        </Box>
    </>;
};

export default Message;