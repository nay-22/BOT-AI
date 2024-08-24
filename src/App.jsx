import { React, useEffect } from 'react';
import { useRef, useState } from "react";
import { ThemeProvider, CssBaseline, Button, Container, Typography, Box, TextField, Grid, Drawer, useMediaQuery, useTheme, Snackbar } from "@mui/material";
import { lightTheme, darkTheme } from "./config/theme";
import Sidebar from "./components/Sidebar";
import MenuIcon from '@mui/icons-material/Menu';
import { compareTwoStrings } from "string-similarity";
import "./App.css";
import Static from "./components/Static";
import responses from "./config/sampleData.json";
import ConversationWindow from "./components/ConversationWindow";

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import LinearProgress from '@mui/material/LinearProgress';
import { useSnackbar } from 'notistack';

import { v4 } from 'uuid';

export default function App() {
  const [mode, setMode] = useState("light");
  const [open, setOpen] = useState(false);
  const [showForceScroll, setShowForceScroll] = useState(false);

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState(JSON.parse(localStorage.getItem('curr')) || []);
  const [message, setMessage] = useState('');

  const [lastSavedIdx, setLastSavedIdx] = useState(0);
  const [savedConversations, setSavedConversations] = useState(JSON.parse(localStorage.getItem('savedPaths')) || []);

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  const scrollableRef = useRef(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleChatOnChange = (event) => {
    setMessage(event.target.value);
  };

  const getTimes = () => {
    const timestamp = new Date().toLocaleTimeString().toUpperCase();
    const time = `${timestamp.split(':')[0]}:${timestamp.split(':')[1]} ${timestamp.split(' ')[1]}`;
    return { timestamp, time };
  };

  const fetchAnswer = (message) => {
    var { timestamp, time } = getTimes();
    const question = {
      username: 'You',
      timestamp,
      message,
      time,
    }
    setConversations(prev => [...prev, question]);
    let idx = -1, prevMatchFraction = -1;
    setIsLoading(true);
    setTimeout(() => {
      responses.forEach(response => {
        const matchFraction = compareTwoStrings(message.toLowerCase(), response.question.toLowerCase());
        if (matchFraction > 0.5 && matchFraction > prevMatchFraction) {
          idx = responses.indexOf(response);
          prevMatchFraction = matchFraction;
        }
      });
      var { timestamp, time } = getTimes();
      setMessages(prev => [...prev, {
        question: message,
        answer: idx !== -1 ? responses[idx].response : 'I am sorry, I am unable to answer your question at this time.',
        timestamp,
        time
      }]);
      const answer = {
        message: idx !== -1 ? responses[idx].response : 'I am sorry, I am unable to answer your question at this time.',
        username: 'Soul AI',
        timestamp,
        time
      }
      // cache current conversation
      localStorage.setItem('curr', JSON.stringify([...((JSON.parse(localStorage.getItem('curr'))) || []), question, answer]));
      setConversations(prev => [...prev, answer]);
      setIsLoading(false);
      setMessage('');
    }, 1500);
  };

  const saveChat = () => {
    if (lastSavedIdx === conversations.length) {
      enqueueSnackbar('The conversation was already saved! Ask away further to save new conversations', {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: '500',
        variant: 'warning'
      });
      return;
    }
    const today = new Date().toLocaleDateString().replace(/\//g, '-');
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem(`${today}`, JSON.stringify([...JSON.parse(localStorage.getItem(`${today}`)) || [], {
        id: v4(),
        conversations: conversations.slice(lastSavedIdx)
      }]));
      localStorage.setItem('savedPaths', JSON.stringify([...JSON.parse(localStorage.getItem('savedPaths')) || [], `${today}` ]));
      setLastSavedIdx(conversations.length);
      localStorage.setItem('lastSavedIdx', conversations.length);
      setIsLoading(false);
      enqueueSnackbar('Chat saved successfully!', {
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top'
        },
        autoHideDuration: '500',
        variant: 'info'
      });
    }, 1500);
  }

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

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          padding: '0',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          height: '100vh',
          width: '100vw',
        }}
        disableGutters
      >
        {isMediumScreen && <Grid item><Sidebar setConversations={setConversations} mode={mode} setMode={setMode} open={open} setOpen={setOpen} /></Grid>}
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            background: mode === 'light' ? 'linear-gradient(180deg, #FFFFFF 0%, #e9deff 100%)' : 'linear-gradient(180deg, #60507B 0%, #383047 54%)'
          }}
          disableGutters
        >
          <Box display={'flex'} alignItems={'center'} justifyContent={'left'} gap={1} sx={{ padding: '1em' }}>
            {!isMediumScreen && <Button onClick={() => setOpen(true)}>
              <MenuIcon sx={{ fontSize: '3em', color: 'primary.dark' }} />
            </Button>}
            <Typography fontWeight={700} color={'primary.dark'} variant="h5">Bot AI</Typography>
            {!isMediumScreen && <Drawer sx={{ padding: '0', margin: '0' }} open={open} onClose={toggleDrawer(false)}>
              <Sidebar setConversations={setConversations} mode={mode} setMode={setMode} open={open} setOpen={setOpen} />
            </Drawer>}
          </Box>

          {isLoading && <LinearProgress color='primary' />}

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
              <ConversationWindow conversations={conversations} />
            )}
            <Box
              sx={{
                position: 'absolute',
                bottom: '80px',
                right: '0%',
                zIndex: 1000
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

          <Box
            padding={'1em'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            sx={{
              position: 'sticky',
              bottom: 0,
            }}
          >
            <TextField
              placeholder='Message Bot AI'
              onChange={handleChatOnChange}
              value={message || ''}
              size="small"
              sx={{
                backgroundColor: 'primary.light',
                fontSize: '1em',
                borderRadius: '.35em',
                '& .MuiOutlinedInput-root': {
                  color: 'black'
                },
                width: '100%'
              }}
              variant="outlined"
            />
            <Button disabled={isLoading} color="secondary" sx={{ textTransform: 'none' }} variant="contained"><Typography fontWeight={'600'} onClick={() => fetchAnswer(message)}>Ask</Typography></Button>
            <Button disabled={isLoading} color="secondary" sx={{ textTransform: 'none' }} variant="contained"><Typography fontWeight={'600'} onClick={() => saveChat()}>Save</Typography></Button>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
}
