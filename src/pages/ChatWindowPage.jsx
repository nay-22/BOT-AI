import { Box, Button, useMediaQuery } from "@mui/material";

import { React, useContext, useEffect } from 'react';
import { useRef, useState } from "react";

import Static from "../components/Static";

import ConversationWindow from "../components/ConversationWindow";

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ConversationContext from "../contexts/ConversationContext";
import { useTheme } from "@emotion/react";

const ChatWindowPage = () => {
    const scrollableRef = useRef(null);
    const [showForceScroll, setShowForceScroll] = useState(false);
    const { conversations } = useContext(ConversationContext);

    const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));


    useEffect(() => {
        scrollDown();
    }, [conversations]);


    const scrollDown = () => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollTo({
                top: scrollableRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }
    return <>
        <Box
            sx={{
                flex: '1',
                overflowY: 'auto',
                padding: '1em',
                maxHeight: '100%',
            }}
            ref={scrollableRef}
            onWheel={(e) => e.deltaY < 0 && setShowForceScroll(true)}
        >
            {conversations.length === 0 ? (
                <Static isMediumScreen={isMediumScreen} />
            ) : (
                <ConversationWindow />
            )}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '80px',
                    right: '0%',
                    zIndex: 10
                }}
            >
                {showForceScroll && <Button onClick={() => {
                    scrollDown();
                    setShowForceScroll(false);
                }}>
                    <ArrowDropDownCircleIcon />
                </Button>}
            </Box>
        </Box>
    </>;
};

export default ChatWindowPage;