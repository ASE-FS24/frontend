import React, {useEffect, useState} from 'react';
import {ForceGraph2D} from 'react-force-graph';
import styled from "styled-components";
import {useAppSelector} from "../hooks";
import {selectActiveUser} from "../User/LoggedInUserSlice";
import {FollowerData, getFollowers, getNetwork} from "../User/UserService";
import Header from "./Header";
import ConnectionComponent from "../User/ConnectionComponent";

const StyledMainNetworkContainer = styled.div`
  display: flex;
`;

const StyledNetworkContainer = styled.div`
  width: 50vw;
  height: calc(100vh - 70px);
  background: rgb(255, 255, 255, 0.5);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
`;

const StyledNetworkContainer2 = styled(StyledNetworkContainer)`
  background: rgb(255, 255, 255, 0.2);
`;

const StyledNetworkTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px auto;
`;

function MyNetwork() {
    const user = useAppSelector(selectActiveUser);
    const [data, setData] = useState<FollowerData | null>(null);
    const [followers, setFollowers] = useState<{ id: string, username: string, profilePictureUrl: string }[]>([]);

    useEffect(() => {
        getFollowers(user.id).then((response) => {
            console.log(data)
            setFollowers(response);
        });
    }, [user]);

    useEffect(() => {
        getNetwork().then((response) => {
            setData(response);
        });
    }, []);

    if (!data) {
        return null; // or some loading state
    }
    const getConnectedNodes = (links: { source: string, target: string }[], userId: string) => {
        return links.reduce((acc: string[], link) => {
            if (link.source === userId) {
                acc.push(link.target);
            } else if (link.target === userId) {
                acc.push(link.source);
            }
            return acc;
        }, []);
    };

    const connectedNodes = getConnectedNodes(data.links, user.id);

    return (
        <>
            <Header/>
            <StyledMainNetworkContainer>
                <StyledNetworkContainer>
                    <StyledNetworkTitle>The NexusNet network</StyledNetworkTitle>
                    <ForceGraph2D
                        width={window.innerWidth / 2}
                        height={window.innerHeight - 130}
                        graphData={data}
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
                    />
                </StyledNetworkContainer>
                <StyledNetworkContainer2>
                    <StyledNetworkTitle>My Network</StyledNetworkTitle>
                    {followers.map((follower) => {
                        return (
                            <ConnectionComponent id={follower.id} username={follower.username}
                                                 profilePictureUrl={follower.profilePictureUrl}/>
                        )
                    })}
                </StyledNetworkContainer2>
            </StyledMainNetworkContainer>
        </>
    );
}

export default MyNetwork;