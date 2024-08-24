import Message from "./Message";
import User from "../assets/user.png";
import Logo from "../assets/logo.png";
import { Grow, LinearProgress, List, ListItem } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useContext, useState } from "react";
import ConversationContext from "../contexts/ConversationContext";

const ConversationWindow = ({}) => {

    const {conversations} = useContext(ConversationContext);

    return (
        <List>
            <TransitionGroup>
                {conversations.map((message, index) => (
                    <Grow key={index} timeout={500}>
                        <ListItem >
                            <Message
                                id={message.id}
                                message={message.message}
                                username={message.username}
                                timestamp={message.time}
                                roleIcon={message.username === 'You' ? User : Logo}
                                rating={message.username === 'You' ? undefined : message.rating}
                            />
                        </ListItem>
                    </Grow>
                ))}
            </TransitionGroup>
        </List>
    );
};

export default ConversationWindow;
