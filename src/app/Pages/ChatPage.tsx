import Header from "./Header";
import styled, {css} from "styled-components";
import {useEffect, useRef, useState} from "react";
import {Chat, MessageType} from "../chat/MessageType";
import {getChatOfParticipants, getChatsOfUser, sendMessage} from "../chat/ChatService";
import {useAppSelector} from "../hooks";
import {selectActiveUser} from "../User/LoggedInUserSlice";
import {dateFormatter} from "../Util/util";
import {ReactComponent as MessageSVG} from "../../static/images/Message.svg";
import {useParams} from "react-router-dom";


const StyledMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100vw;
  height: calc(100vh - 60px);
`;

const StyledChatsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledActiveChatContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255, 0.5);

`;

const StyledMessagesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  height: calc(100% - 250px);
  width: calc(100% - 40px);

  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledOverlay = styled.div`
  content: "";
  position: sticky;
  top: -20px;
  min-height: 100px;
  height: 100px;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), transparent);
  pointer-events: none;
  z-index: 1;
`;

const StyledChatHeader = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #ffffff;
  height: 60px;
  background-color: ${props => props.$active ? "rgb(255, 255, 255, 0.5)" : "rgb(255, 255, 255, 0.3)"};
  font-size: 2rem;
  text-align: center;
  align-items: center;

  &:hover {
    background: rgb(255, 255, 255, 0.5);
    border-bottom: 1px solid white;
    cursor: pointer;
  }
`;

const StyledHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
`;

const StyledLargeHeading = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #fff;

`;

const StyledChatMessage = styled.div<{ $active: boolean }>`
  position: relative;
  display: flex;
  min-width: 150px;
  width: fit-content;
  max-width: 80%;
  margin: ${props => props.$active ? "5px 0 5px auto" : "5px auto 5px 0"};
  background-color: ${props => props.$active ? "rgba(0,171,255,1)" : "rgba(150,150,150,1)"};
  padding: 10px 10px 25px 10px;
  border-radius: 15px;
  color: #ffffff;
  font-size: 1.5rem;
`;

const StyledMessageDate = styled.div`
  position: absolute;
  bottom: 5px;
  right: 15px;
  font-style: italic;
  font-size: 1rem;
`;

const StyledMessageInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  height: 100px;
  padding: 0 20px;
`;

const StyledMessageInput = styled.input`
  font-size: 1.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 0 10px;
  color: #ffffff;
  margin: auto 10px auto auto;
  height: 40px;
  width: 50%;
  min-width: 20px;

  &::placeholder {
    color: #ffffff;
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder { /* Edge 12 -18 */
    color: #ffffff;
  }
`;

const StyledSendMessageSVGContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  color: white;
  background-color: ${props => props.disabled ? "#6e6e6e" : "#00ABFF"};;
  border-radius: 50%;

  &:hover {
    ${props => !props.disabled && css`
      cursor: pointer;
      scale: 1.15;
    `}
  }
`;


export function ChatPage() {
    const {chatId} = useParams();
    const loggedInUser = useAppSelector(selectActiveUser);
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChat, setActiveChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchChats = async () => {
            const fetchedChats = await getChatsOfUser(loggedInUser.username);
            setChats(fetchedChats);
            if (chatId !== undefined) {
                const chat = fetchedChats.find(chat => chat.id === chatId);
                if (chat) {
                    setActiveChat(chat);
                }
            }
            console.log(fetchedChats)
        }

        fetchChats().then();
    }, [])

    // fetch message every 2 seconds
    useEffect(() => {
        if (activeChat) {
            const interval = setInterval(async () => {
                const participant1 = activeChat.participant1 === loggedInUser.username ? activeChat.participant1 : activeChat.participant2
                const participant2 = activeChat.participant1 === loggedInUser.username ? activeChat.participant2 : activeChat.participant1
                const chat = await getChatOfParticipants(participant1, participant2);
                setActiveChat(chat);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [activeChat]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [activeChat]);

    function sendNewMessage() {
        if (message !== "" && activeChat) {
            const newMessage: MessageType = {
                content: message,
                sender: loggedInUser.username,
                receiver: activeChat.participant1 === loggedInUser.username ? activeChat.participant2 : activeChat.participant1
            }
            sendMessage(newMessage).then(() => {
                setMessage("");
            });
        }
    }

    return (
        <>
            <Header/>
            <StyledMainContainer>
                <StyledChatsContainer>
                    <StyledHeading>Chats</StyledHeading>
                    {chats.length > 0 && chats.map(chat => (
                        <StyledChatHeader onClick={() => setActiveChat(chat)}
                                          $active={chat.id === activeChat?.id}
                                          key={chat.id}>{chat.participant2 === loggedInUser.username ? chat.participant1 : chat.participant2}</StyledChatHeader>
                    ))}
                </StyledChatsContainer>
                <StyledActiveChatContainer>
                    {activeChat !== null ?
                        <>
                            <StyledLargeHeading>{activeChat.participant2 === loggedInUser.username ? activeChat.participant1 : activeChat.participant2}</StyledLargeHeading>
                            <StyledMessagesContainer>
                                <StyledOverlay/>
                                {activeChat.messages.map(message => (
                                    <StyledChatMessage $active={message.sender === loggedInUser.username}
                                                       key={message.id}>{message.content}
                                        <StyledMessageDate>{dateFormatter(message.timestamp)}</StyledMessageDate>
                                    </StyledChatMessage>
                                ))}
                                <div ref={messagesEndRef}/>
                            </StyledMessagesContainer>
                            <StyledMessageInputContainer>
                                <StyledMessageInput id="message"
                                                    value={message}
                                                    placeholder=""
                                                    onChange={(event) => setMessage(event.target.value)}/>
                                <StyledSendMessageSVGContainer title="Send message" disabled={message === ""}
                                                               onClick={sendNewMessage}>
                                    <MessageSVG style={{width: "50px", height: "50px", margin: "5px -3px -5px 3px"}}/>
                                </StyledSendMessageSVGContainer>
                            </StyledMessageInputContainer>
                        </> : <div>Select a chat to start messaging</div>}
                </StyledActiveChatContainer>
            </StyledMainContainer>
        </>
    )
}