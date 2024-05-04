import Header from "./Header";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {Chat} from "../chat/MessageType";
import {getChatsOfUser} from "../chat/ChatService";
import {useAppSelector} from "../hooks";
import {selectActiveUser} from "../User/LoggedInUserSlice";


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
  border: 1px solid black;
  background: rgb(0, 0, 0, 0.5);
`;

const StyledActiveChatContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255, 0.5);
  padding: 0 25px;
`;

const StyledChatHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #ffffff;
  height: 60px;
  background-color: rgb(255, 255, 255, 0.3);
  margin: 2px 0;
  font-size: 2rem;
  text-align: center;
  align-items: center;

  &:hover {
    background: rgb(255, 255, 255, 0.5);
    border: 1px solid black;
    cursor: pointer;
  }
`;

const StyledHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
`;

const StyledChatMessage = styled.div<{ active: boolean }>`
  display: flex;
  width: fit-content;
  max-width: 80%;
  margin: ${props => props.active ? "5px 0 5px auto" : "5px auto 5px 0"};
  background-color: ${props => props.active ? "rgba(0,171,255,1)" : "rgba(150,150,150,1)"};
  padding: 10px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 1.5rem;
`;


export function ChatPage() {
    const loggedInUser = useAppSelector(selectActiveUser);
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChat, setActiveChat] = useState<Chat | null>(null);

    useEffect(() => {
        const fetchChats = async () => {
            const fetchedChats = await getChatsOfUser(loggedInUser.username);
            setChats(fetchedChats);
            console.log(fetchedChats)
        }

        fetchChats().then();
    }, [])

    return (
        <>
            <Header/>
            <StyledMainContainer>
                <StyledChatsContainer>
                    <StyledHeading>Chats</StyledHeading>
                    {chats.length > 0 && chats.map(chat => (
                        <StyledChatHeader onClick={() => setActiveChat(chat)}
                                          key={chat.id}>{chat.participant2 === loggedInUser.username ? chat.participant1 : chat.participant2}</StyledChatHeader>
                    ))}
                </StyledChatsContainer>
                <StyledActiveChatContainer>
                    {activeChat &&
                        <><StyledHeading>{activeChat.participant2 === loggedInUser.username ? activeChat.participant1 : activeChat.participant2}</StyledHeading>
                            {activeChat.messages.map(message => (
                                <StyledChatMessage active={message.sender === loggedInUser.username}
                                                   key={message.id}>{message.content}</StyledChatMessage>
                            ))}
                        </>}
                </StyledActiveChatContainer>
            </StyledMainContainer>
        </>
    )
}