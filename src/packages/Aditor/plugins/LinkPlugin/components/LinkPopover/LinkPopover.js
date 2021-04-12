import React from 'react';
import styled from 'styled-components';
import { AiOutlineGlobal } from 'react-icons/ai';
import { FaRegCopy, FaRegEdit, FaUnlink } from 'react-icons/fa';
import _Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

const Paper = styled(_Paper)`
  width: 284px;
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 6px;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

const MiddleContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
`;

const HyperlinkElement = styled.a`
  width: 160px;
  height: 18px;
  user-select: none;
  display: inline-block;
  max-width: 400px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 500;
  text-decoration: none;
  font-size: 13px;

  color: rgb(17, 85, 204);
  cursor: pointer;
`;

const RightContainer = styled.div`
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

function LinkPopover({ url, onCopyLink, onEditLink, onRemoveLink }) {
  return (
    <Paper>
      <LeftContainer>
        <AiOutlineGlobal />
      </LeftContainer>
      <MiddleContainer>
        <Tooltip title={url}>
          <HyperlinkElement
            target='_blank'
            rel='noopener noreferrer'
            href={url}
          >
            {url}
          </HyperlinkElement>
        </Tooltip>
      </MiddleContainer>
      <RightContainer>
        <Tooltip title='Copy link' onClick={onCopyLink}>
          <span>
            <FaRegCopy />
          </span>
        </Tooltip>
        <Tooltip title='Edit link' onClick={onEditLink}>
          <span>
            <FaRegEdit />
          </span>
        </Tooltip>
        <Tooltip title='Remove link' onClick={onRemoveLink}>
          <span>
            <FaUnlink />
          </span>
        </Tooltip>
      </RightContainer>
    </Paper>
  );
}

export default LinkPopover;
