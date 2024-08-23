import Message from "./Message";
import User from "../assets/user.png";
import Logo from "../assets/logo.png";
import { Grow, LinearProgress, List, ListItem } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

const ConversationWindow = ({ conversations }) => {
    return (
        <List>
            <TransitionGroup>
                {conversations.map((message, index) => (
                    <Grow key={index} timeout={500}>
                        <ListItem >
                            <Message
                                message={message.message}
                                username={message.username}
                                timestamp={message.time}
                                roleIcon={message.username === 'You' ? User : Logo}
                            />
                        </ListItem>
                    </Grow>
                ))}
            </TransitionGroup>
        </List>
    );
};

export default ConversationWindow;
