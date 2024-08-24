import { useLocation, useNavigate, useParams } from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
import { TransitionGroup } from "react-transition-group";

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Box, Button, Grow, List, ListItem } from "@mui/material";

import ConversationContext from "../contexts/ConversationContext";
import Message from "../components/Message";

import User from "../assets/user.png";
import Logo from "../assets/logo.png";

const SavedChats = () => {
    const [savedConversations, setSavedConversations] = useState([]);
    const [showForceScroll, setShowForceScroll] = useState(false);
    const scrollableRef = useRef(null);

    const { filter } = useContext(ConversationContext);
    
    const navigate = useNavigate();
    const location = useLocation();
    const { date } = useParams();

    useEffect(() => {
        const localItem = JSON.parse(localStorage.getItem(date));
        if (!localItem) navigate('/');

        setSavedConversations(localItem);
    }, [location]);

    useEffect(() => {
        const localItems = JSON.parse(localStorage.getItem(date)) || [];
        let filtered = [];
        if (filter.rateFilter === 'All') {
            filtered = localItems;
        } else if (filter.rateFilter === 'Negative') {
            filtered = localItems.filter(item => item.answer.rating && item.answer.rating.type === 'negative');
        } else {
            filtered = localItems.filter(item => item.answer.rating && item.answer.rating.type === 'positive' && item.answer.rating.value === filter.rateFilter);
        }
        filtered = filtered.sort((a, b) => {
            if (filter.dateSort === 'Low') {
                return new Date(a.answer.timestamp) - new Date(b.answer.timestamp);
            } else {
                return new Date(b.answer.timestamp) - new Date(a.answer.timestamp);
            }
        });
        setSavedConversations(filtered);
    }, [filter, date]);

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
            <List>
                <TransitionGroup>
                    {savedConversations.map((message, index) => (
                        <Grow key={index} timeout={500}>
                            <Box>
                                <ListItem >
                                    <Message
                                        id={message.question.id}
                                        message={message.question.message}
                                        username={message.question.username}
                                        timestamp={message.question.time}
                                        roleIcon={message.question.username === 'You' ? User : Logo}
                                        rating={message.question.rating}
                                        saved={true}
                                    />
                                </ListItem>
                                <ListItem>
                                    <Message
                                        id={message.answer.id}
                                        message={message.answer.message}
                                        username={message.answer.username}
                                        timestamp={message.answer.time}
                                        roleIcon={message.answer.username === 'You' ? User : Logo}
                                        rating={message.answer.rating}
                                        saved={true}
                                    />
                                </ListItem>
                            </Box>
                        </Grow>
                    ))}
                </TransitionGroup>
            </List>
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

export default SavedChats;