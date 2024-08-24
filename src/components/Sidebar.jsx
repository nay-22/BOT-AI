import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import { Switch, Typography, useMediaQuery } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { useTheme } from '@emotion/react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';

import ConversationContext from '../contexts/ConversationContext';

import EditIcon from "../assets/edit.png";
import LogoIcon from "../assets/logo.png";


const Sidebar = ({ setConversations, open, setOpen, mode, setMode }) => {

    const { savedPaths, setSavedPaths } = useContext(ConversationContext);

    const theme = useTheme();
    const isXlScreen = useMediaQuery((theme) => theme.breakpoints.up('xl'));

    const navigate = useNavigate();
    const location = useLocation();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem('theme', mode === "light" ? "dark" : "light");
    };

    const clearCurrentConversation = () => {
        localStorage.setItem('curr', JSON.stringify([]));
        localStorage.setItem('lastSavedIdx', 0);
        setConversations([]);
    }

    const navigateToHome = () => {
        navigate("/");
    }

    return (
        <Box sx={{ width: isXlScreen ? 350 : 250, padding: '0', margin: '0', height: '100vh' }} role="presentation">
            <List sx={{
                padding: '0', margin: '0',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                backgroundColor: 'primary.dark',
                overflowY: 'auto'
            }}>
                <ListItem
                    alignItems='center'
                    sx={{
                        backgroundColor: "primary.main",
                        justifyContent: 'space-between',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1
                    }}
                    key={'New Chat'}
                    disablePadding
                >
                    <ListItemButton
                        sx={{
                            color: 'black',
                            fontWeight: 'bold'
                        }}
                        onClick={location.pathname.includes('chat') ? navigateToHome : clearCurrentConversation}
                    >
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <img className='logo' width='30px' src={LogoIcon} alt="" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography textAlign={'center'} sx={{ fontSize: '1.2em' }}>
                                <b>{location.pathname.includes('chat') ? 'Home' : 'New Chat'}</b>
                            </Typography>
                        </ListItemText>
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            {location.pathname.includes('chat') ? <ArrowBackIosIcon /> : <img width='25px' src={EditIcon} alt="" />}
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem
                    sx={{
                        position: 'sticky',
                        top: '52.8px',
                        zIndex: 1,
                        backgroundColor: 'primary.dark'
                    }}
                >
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Switch color={'primary.dark'} checked={mode === 'dark'} onClick={toggleTheme} />
                        <Typography>{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</Typography>
                    </Box>
                </ListItem>
                <Divider
                    sx={{
                        position: 'sticky',
                        top: '105.6px',
                        zIndex: 1,
                        backgroundColor: 'primary.dark'
                    }}
                />
                <ListItem
                    sx={{
                        position: 'sticky',
                        top: '107px',
                        zIndex: 1,
                        backgroundColor: 'primary.dark',
                    }}
                    width={'100%'}
                >
                    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Typography color={'text.light'} fontWeight={'bold'} >Past Conversations</Typography>
                    </Box>
                </ListItem>
                {savedPaths.map(path =>
                    <NavLink
                        key={path}
                        to={`/chat/${path}`}
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                    >
                        <ListItem sx={{ flexGrow: 1 }} disablePadding>
                            <ListItemButton>
                                {path}
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                )}
            </List>
        </Box>
    );
}
export default Sidebar;