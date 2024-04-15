import React, {useEffect, useState} from 'react';
import {ForceGraph2D} from 'react-force-graph';
import styled from "styled-components";
import {useAppSelector} from "../hooks";
import {selectActiveUser} from "../User/LoggedInUserSlice";
import {getFollowers} from "../User/UserService";
import Header from "./Header";
import ConnectionComponent from "../User/ConnectionComponent";
import {selectAllUsers, selectNetwork, selectNetworkStatus} from "../User/UserSlice";
import {StyledSearchInput} from "../Post/PostsComponent";
import Loading from "./LoadingComponent";
import {FollowerData} from "../User/UserType";

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
  max-height: 40vh;
  overflow: auto;
`;

const SearchConnectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 40vw;
`;

function MyNetwork() {
    const allUsers = useAppSelector(selectAllUsers);
    const user = useAppSelector(selectActiveUser);
    const data = useAppSelector(selectNetwork);
    const networkStatus = useAppSelector(selectNetworkStatus);
    const [filteredUsers, setFilteredUsers] = useState(allUsers);
    const [followers, setFollowers] = useState<{ id: string, username: string, profilePictureUrl: string }[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [connectedNodes, setConnectedNodes] = useState<string[]>([]);
    const [graphDataCopy , setGraphDataCopy] = useState<FollowerData>();

    useEffect(() => {
        getFollowers(user.id).then((response) => {
            setFollowers(response);
        });
    }, [user, data]);

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

    const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setFilteredUsers(allUsers.filter((user) => user.username.includes(searchValue)));
        }
    }

    console.log(filteredUsers)
    return (
        <>
            <Header/>
            <StyledMainNetworkContainer>
                <StyledNetworkContainer>
                    <StyledNetworkTitle>The NexusNet network</StyledNetworkTitle>
                    {networkStatus === 'loading' ? <Loading /> :
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
                            id="search"
                            value={searchValue}
                            placeholder="Search..."
                            onChange={(event) => setSearchValue(event.target.value)}
                            onKeyDown={onEnter}></StyledSearchInput>
                        {filteredUsers.length > 0 && filteredUsers.map((user) => {
                            return (
                                <div key={user.id}>{user.username}</div>
                            )
                        })}
                    </SearchConnectionsContainer>
                    <StyledNetworkTitle>Friends</StyledNetworkTitle>
                    <ConnectionsContainer>
                        {followers.map((follower) => {
                            return (
                                <ConnectionComponent key={follower.id} id={follower.id} username={follower.username}
                                                     profilePictureUrl={follower.profilePictureUrl}/>
                            )
                        })}
                    </ConnectionsContainer>
                </StyledNetworkContainer>
            </StyledMainNetworkContainer>
        </>
    );
}

export default MyNetwork;