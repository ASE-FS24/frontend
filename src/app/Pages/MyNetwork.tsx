import React, {useEffect, useState} from 'react';
import {ForceGraph2D} from 'react-force-graph';
import styled from "styled-components";
import {useAppSelector} from "../hooks";
import {selectActiveUser, selectConnections} from "../User/LoggedInUserSlice";
import Header from "./Header";
import ConnectionComponent from "../User/ConnectionComponent";
import {selectAllUsers, selectNetwork, selectNetworkStatus} from "../User/UserSlice";
import {StyledSearchInput} from "../Post/PostsComponent";
import Loading from "./LoadingComponent";
import {FollowerData, UserSummary} from "../User/UserType";
import UserSummaryComponent from "../User/UserSummaryComponent";

const StyledMainNetworkContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledNetworkContainer = styled.div`
  width: 49.5vw;
  height: calc(100vh - 70px);
  background: rgb(255, 255, 255, 0.5);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
`;

const StyledNetworkTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px auto;
  width: 100%;
  text-align: center;
`;

const ConnectionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  border: 1px solid white;
  margin: 10px 5px;
`;

const SearchConnectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(50% - 40px);
  background: rgb(0, 0, 0, 0.2);
  margin-top: 10px;
`;

function MyNetwork() {
    const allUsers = useAppSelector(selectAllUsers);
    const user = useAppSelector(selectActiveUser);
    const connections = useAppSelector(selectConnections);
    const data = useAppSelector(selectNetwork);
    const networkStatus = useAppSelector(selectNetworkStatus);
    const [filteredUsers, setFilteredUsers] = useState(allUsers);
    const [filteredConnections, setFilteredConnections] = useState<UserSummary[]>(connections);
    const [searchFindFriendValue, setSearchFindFriendValue] = useState<string>('');
    const [searchFindConnectionValue, setSearchFindConnectionValue] = useState<string>('');
    const [connectedNodes, setConnectedNodes] = useState<string[]>([]);
    const [graphDataCopy, setGraphDataCopy] = useState<FollowerData>();

    useEffect(() => {
        setFilteredUsers(allUsers);
    }, [allUsers]);

    useEffect(() => {
        setGraphDataCopy({
            nodes: data.nodes.map(node => ({...node})),
            links: data.links.map(link => ({...link}))
        })
        const cNodes = data.links.reduce((acc: string[], link) => {
            if (link.source === user.id) {
                acc.push(link.target);
            } else if (link.target === user.id) {
                acc.push(link.source);
            }
            return acc;
        }, []);
        setConnectedNodes(cNodes);
    }, [data, user.id])

    const onEnterFindFriend = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setFilteredUsers(allUsers.filter((user) => user.username.includes(searchFindFriendValue)));
        }
    }

    const onEnterFindConnection = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setFilteredConnections(connections.filter((connection) => connection.username.includes(searchFindConnectionValue)));
        }
    }

    console.log(filteredUsers)
    return (
        <>
            <Header/>
            <StyledMainNetworkContainer>
                <StyledNetworkContainer>
                    <StyledNetworkTitle>The NexusNet network</StyledNetworkTitle>
                    {networkStatus === 'loading' ? <Loading/> :
                        <ForceGraph2D
                            width={window.innerWidth / 2}
                            height={window.innerHeight - 130}
                            graphData={graphDataCopy}
                            nodeCanvasObject={(node, ctx, globalScale) => {
                                // Draw the circle
                                ctx.beginPath();
                                if (node.x !== undefined && node.y !== undefined) {
                                    ctx.arc(node.x, node.y, (node.val) * globalScale, 0, 2 * Math.PI, false);
                                }
                                ctx.fillStyle = (user.id === node.id || connectedNodes.includes(node.id)) ? '#FFC000' : 'blue';
                                ctx.fill();

                                // Draw the label
                                const label = node.name;
                                const fontSize = (node.val / 2) * globalScale;
                                ctx.font = `${fontSize}px Sans-Serif`;
                                ctx.fillStyle = 'black';
                                if (node.x !== undefined && node.y !== undefined) {
                                    ctx.fillText(label, (node.x - (node.val * 2)), (node.y + (node.val * 2)));
                                }
                            }}
                            nodeRelSize={5}
                            enablePanInteraction={false}
                            linkDirectionalParticles="value"
                        />}
                </StyledNetworkContainer>
                <StyledNetworkContainer>
                    <StyledNetworkTitle>My Network</StyledNetworkTitle>
                    <SearchConnectionsContainer>
                        <StyledNetworkTitle>Find a friend</StyledNetworkTitle>
                        <StyledSearchInput
                            id="searchFindFriend"
                            value={searchFindFriendValue}
                            placeholder="Search..."
                            onChange={(event) => setSearchFindFriendValue(event.target.value)}
                            onKeyDown={onEnterFindFriend}></StyledSearchInput>
                        <ConnectionsContainer>
                            {filteredUsers.length > 0 && filteredUsers.map((user) => {
                                return (
                                    <UserSummaryComponent key={"user_" + user.id} user={user}/>
                                )
                            })}
                        </ConnectionsContainer>
                    </SearchConnectionsContainer>
                <SearchConnectionsContainer>
                <StyledNetworkTitle>My connections</StyledNetworkTitle>
                    <StyledSearchInput
                        id="searchFindConnection"
                        value={searchFindConnectionValue}
                        placeholder="Search..."
                        onChange={(event) => setSearchFindConnectionValue(event.target.value)}
                        onKeyDown={onEnterFindConnection}></StyledSearchInput>
                    <ConnectionsContainer>
                        {filteredConnections.map((connection) => {
                            return (
                                <ConnectionComponent key={connection.id} connection={connection}/>
                            )
                        })}
                    </ConnectionsContainer>
                </SearchConnectionsContainer>
                </StyledNetworkContainer>
            </StyledMainNetworkContainer>
        </>
    );
}

export default MyNetwork;