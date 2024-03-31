import styled from "styled-components";
import {Comment} from "./CommentType";
import {ReactComponent as LikeSVG} from "../../static/images/heart.svg";
import React from "react";
import {StyledIconContainer} from "../Post/PostComponent";


const StyledComment = styled.div`
  width: 80%;
  min-width: 200px;
  background-color: #FFC000;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  margin: 5px 10px 5px auto;
  position: relative;
`;

const StyledCommentContent = styled.div`
  color: #000000;
  padding: 5px;
  
`;

const StyledCommentAuthor = styled.div`
  color: #000000;
  margin-left: auto;
  padding: 5px;
`;

const StyledLikeContainer = styled.div`
  position: absolute;
  left: -3px;
  bottom: -12px;
  scale: 0.75;
`;

const StyledLikesCount = styled.div`
  position: absolute;
  left: 30px;
  bottom: 2px;
  color: #000000;
`;

function CommentComponent({ comment }: { comment: Comment }) {
    return(
        <StyledComment>
            <StyledCommentContent>{comment.content}</StyledCommentContent>
            <StyledCommentAuthor>Author</StyledCommentAuthor>
            <StyledLikeContainer>
                <LikeSVG style={{color: "#E72950"}}/>
            </StyledLikeContainer>
            <StyledLikesCount>
                {comment.likes}
            </StyledLikesCount>
        </StyledComment>
    )
}

export default CommentComponent;