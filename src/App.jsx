import { Route, Routes, useLocation } from 'react-router';
import { compareTwoStrings } from "string-similarity";
import { useSnackbar } from 'notistack';
import { React, useEffect } from 'react';
import { useRef, useState } from "react";
import { v4 } from 'uuid';

import LinearProgress from '@mui/material/LinearProgress';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuIcon from '@mui/icons-material/Menu';
import {
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
  Typography,
  Container,
  TextField,
  useTheme,
  Button,
  Drawer,
  Grid,
  Box,
  Modal,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import ConversationContext from './contexts/ConversationContext';
import { lightTheme, darkTheme } from "./config/theme";
import ChatWindowPage from './pages/ChatWindowPage';
import responses from "./config/sampleData.json";
import SavedChats from './pages/SavedChats';
import Sidebar from "./components/Sidebar";
import "./App.css";
import { RestartAlt, Restore } from '@mui/icons-material';

export default function App() {
  const [conversations, setConversations] = useState(JSON.parse(localStorage.getItem('curr')) || []);
  const [savedPaths, setSavedPaths] = useState(JSON.parse(localStorage.getItem('savedPaths')) || []);
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'dark');
  const [lastSavedIdx, setLastSavedIdx] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([]);
  const [rateFilter, setRateFilter] = useState('All');
  const [dateSort, setDateSort] = useState('Low');
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState({
    rateFilter,
    dateSort
  });
  const [open, setOpen] = useState(false);



  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  const { enqueueSnackbar } = useSnackbar();
  const scrollableRef = useRef(null);
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleChatOnChange = (event) => {
    setMessage(event.target.value);
  };

  const getTimes = () => {
    const timestamp = new Date().toISOString();
    const time = new Date().toLocaleTimeString().toUpperCase();
    return { timestamp, time };
  };

  const fetchAnswer = (message) => {
    var { timestamp, time } = getTimes();
    const question = {
      id: `U#${v4()}`,
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
      const answer = {
        id: `AI#${v4()}`,
        message: idx !== -1 ? responses[idx].response : 'I am sorry, I am unable to answer your question at this time.',
        username: 'Tech AI',
        timestamp,
        time
      }
      localStorage.setItem('curr', JSON.stringify([...((JSON.parse(localStorage.getItem('curr'))) || []), question, answer]));
      setConversations(prev => [...prev, answer]);
      setIsLoading(false);
      setMessage('');
      setMessages(prev => [...prev, { question, answer }]);
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
      localStorage.setItem(`${today}`, JSON.stringify([...JSON.parse(localStorage.getItem(`${today}`)) || [], ...messages.slice(Math.floor(lastSavedIdx / 2))]));
      let savedPaths = JSON.parse(localStorage.getItem('savedPaths')) || [];
      if (savedPaths.length === 0 || savedPaths[0] !== today) savedPaths = [today, ...savedPaths];
      localStorage.setItem('savedPaths', JSON.stringify(savedPaths));
      setSavedPaths(savedPaths);

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
    }, 2000);
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

  const handleFilter = (e) => {
    setShowFilter(false);
    setFilter({rateFilter, dateSort})
  }

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <ConversationContext.Provider
        value={{
          conversations,
          setConversations,
          savedPaths,
          setSavedPaths,
          filter,
          setFilter,
          messages,
          setMessages
        }}
      >
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
                <MenuIcon sx={{ fontSize: '3em', color: 'primary.light' }} />
              </Button>}
              <Typography fontWeight={700} color={'primary.light'} variant="h5">Tech AI</Typography>

              {!isMediumScreen && <Drawer sx={{ padding: '0', margin: '0' }} open={open} onClose={toggleDrawer(false)}>
                <Sidebar setConversations={setConversations} mode={mode} setMode={setMode} open={open} setOpen={setOpen} />
              </Drawer>}
            </Box>
            {location.pathname.includes('chat') && <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={1} sx={{ padding: '1em' }}>
              <Typography fontWeight={700} color={'background.dark'} variant="h6">Conversation History</Typography>
              <Box>
                <Button sx={{ mr: '1em',minWidth: '0' }} variant='contained' size='small' onClick={() => { setFilter({
                  rateFilter: 'All',
                  dateSort: 'Low'
                }) }}>
                  <RestartAlt color={'primary.main'} />
                </Button>
                <Button sx={{minWidth: '0'}} variant='contained' size='small' onClick={() => setShowFilter(prev => !prev)}>
                  <FilterAltIcon color={'primary.main'} />
                </Button>
              </Box>
            </Box>}

            <Modal
              open={showFilter}
              onClose={() => setShowFilter(false)}
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
                <Typography mb={'1.5em'} variant="h6" component="h2">
                  Filter Saved Conversations
                </Typography>
                <Box
                  // sx={{
                  //   display: 'flex',
                  //   alignItems: 'center',
                  //   justifyContent: 'space-between',
                  //   gap: '1em',
                  //   // mt: '1em'
                  // }}
                >
                  <InputLabel><Typography fontWeight={'bold'} color={'text.primary'}>Rating</Typography></InputLabel>
                  <Select
                    sx={{
                      width: '100%',
                      color: 'white',
                      mb: '1em',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '.MuiSvgIcon-root': {
                        color: 'white',
                      },
                      '.MuiSelect-icon': {
                        color: 'white',
                      },
                      '.MuiSelect-root': {
                        color: 'white',
                      },
                    }}
                    value={rateFilter}
                    onChange={(e) => setRateFilter(e.target.value)}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: 'primary.dark',
                          '& .MuiMenuItem-root.Mui-selected': {
                            bgcolor: 'secondary.main',
                            color: 'black',
                            '&:hover': {
                              bgcolor: 'secondary.light',
                            },
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="5">5-Star</MenuItem>
                    <MenuItem value="4">4-Star</MenuItem>
                    <MenuItem value="3">3-Star</MenuItem>
                    <MenuItem value="2">2-Star</MenuItem>
                    <MenuItem value="1">1-Star</MenuItem>
                    <MenuItem value="Negative">Negative</MenuItem>
                    <MenuItem value="All">All</MenuItem>
                  </Select>

                  <InputLabel><Typography fontWeight={'bold'} color={'text.primary'}>Time</Typography></InputLabel>
                  <Select
                    sx={{
                      width: '100%',
                      color: 'white',
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '.MuiSvgIcon-root': {
                        color: 'white',
                      },
                      '.MuiSelect-icon': {
                        color: 'white',
                      },
                      '.MuiSelect-root': {
                        color: 'white',
                      },
                    }}
                    value={dateSort}
                    onChange={(e) => {setDateSort(e.target.value)}}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: 'primary.dark',
                          '& .MuiMenuItem-root.Mui-selected': {
                            bgcolor: 'secondary.main',
                            color: 'black',
                            '&:hover': {
                              bgcolor: 'secondary.light',
                            },
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </Box>
                <Button onClick={handleFilter} sx={{width: '100%', mt: '1em'}} size='large' variant='contained'>Filter</Button>
              </Box>
            </Modal>

            {isLoading && <LinearProgress color='primary' />}

            {/* Chat Window Section : USE OULET HERE */}

            <Routes>
              <Route path="/chat/:date" element={<SavedChats />} />
              <Route path="/" element={<ChatWindowPage />} />
            </Routes>

            {/* Chat Input Section */}
            {location.pathname === '/' && <Box
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
                placeholder='Message Tech AI'
                onChange={handleChatOnChange}
                disabled={isLoading}
                value={message || ''}
                size="small"
                sx={{
                  backgroundColor: 'text.light',
                  fontSize: '1em',
                  borderRadius: '.35em',
                  '& .MuiOutlinedInput-root': {
                    color: 'black'
                  },
                  width: '100%'
                }}
                variant="outlined"
              />
              <Button
                disabled={isLoading || message === ''}
                color="secondary"
                sx={{
                  textTransform: 'none',
                  '&.Mui-disabled': {
                    backgroundColor: 'text.secondary',
                    color: 'text.primary'
                  }
                }}
                variant="contained">
                <Typography fontWeight={'600'} onClick={() => fetchAnswer(message)}>Ask</Typography>
              </Button>
              <Button
                disabled={isLoading}
                color="secondary"
                sx={{
                  textTransform: 'none',
                  '&.Mui-disabled': {
                    backgroundColor: 'text.secondary',
                    color: 'text.primary'
                  }
                }}
                variant="contained">
                <Typography fontWeight={'600'} onClick={() => saveChat()}>Save</Typography>
              </Button>
            </Box>}
          </Container>
        </Container>
      </ConversationContext.Provider>
    </ThemeProvider>
  );
}
