import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import EditIcon from "../assets/edit.png";
import LogoIcon from "../assets/logo.png";
import { Switch, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

const Sidebar = ({ setConversations, open, setOpen, mode, setMode }) => {

    const theme = useTheme()
    const isXlScreen = useMediaQuery((theme) => theme.breakpoints.up('xl'))

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const clearCurrentConversation = () => {
        localStorage.setItem('curr', JSON.stringify([]));
        localStorage.setItem('lastSavedIdx', 0);
        setConversations([]);
    }

    return (
        <Box sx={{ width: isXlScreen ? 350 : 250, padding: '0', margin: '0', height: '100vh' }} role="presentation">
            <List sx={{
                padding: '0', margin: '0',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}>
                <ListItem alignItems='center' sx={{ backgroundColor: "primary.main", justifyContent: 'space-between' }} key={'New Chat'} disablePadding>
                    <ListItemButton
                        sx={{
                            color: 'black',
                            fontWeight: 'bold'
                        }}
                        onClick={clearCurrentConversation}
                    >
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <img className='logo' width='30px' src={LogoIcon} alt="" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography textAlign={'center'} sx={{ fontSize: '1.2em' }}>
                                New Chat
                            </Typography>
                        </ListItemText>
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <img width='25px' src={EditIcon} alt="" />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{ flexGrow: 1 }} disablePadding>
                    <ListItemButton>
                        {/* HISTORY CHAT ITEMS */}
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Switch color={'primary.dark'} checked={mode === 'dark'} onClick={toggleTheme} />
                        <Typography>{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</Typography>
                    </Box>
                </ListItem>
            </List>
        </Box>
    );
}
export default Sidebar;