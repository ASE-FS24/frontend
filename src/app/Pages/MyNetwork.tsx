import React, {useEffect, useState} from 'react';
import {ForceGraph2D} from 'react-force-graph';
import styled from "styled-components";
import {useAppSelector} from "../hooks";
import {selectActiveUser} from "../User/LoggedInUserSlice";
import {FollowerData, getFollowers} from "../User/UserService";

const StyledNetworkContainer = styled.div`
  width: 50vw;
  height: 100vh;
  background: rgb(255, 255, 255, 0.5);
`;

function MyNetwork() {
    const user = useAppSelector(selectActiveUser);
    const [data, setData] = useState<FollowerData | null>(null);

    useEffect(() => {
        getFollowers(user.id).then((response) => {
            console.log(data)
            setData(response);
        });
    }, [user]);

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
        <StyledNetworkContainer>
            <ForceGraph2D
                width={window.innerWidth / 2}
                height={window.innerHeight}
                graphData={data}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    // Draw the circle
                    ctx.beginPath();
                    if (node.x !== undefined && node.y !== undefined) {
                        ctx.arc(node.x, node.y, (node.val / 2) * globalScale, 0, 2 * Math.PI, false);
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
    );
}

export default MyNetwork;