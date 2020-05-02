import React from 'react';
import styled from 'styled-components';
import {AiOutlineGlobal} from 'react-icons/ai';
import {FaRegCopy, FaRegEdit, FaUnlink} from 'react-icons/fa';
import _Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

const Paper = styled(_Paper)`
  width: 284px;
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  
  .global{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
  }
  
  a{
      user-select: none;
      display: inline-block;
      width: 160px;
      max-width: 400px;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 500;
      text-decoration: none;
      
      color: rgb(17, 85, 204);
      cursor: pointer;
  }
  
  .tools {
    user-select: none;
    width: 90px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      
      &:hover{
        background-color: rgba(0, 0, 0, 0.06);
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
`;

function LinkPopover({url, onCopyLink, onEditLink, onRemoveLink}){
    return <Paper>
        <span className='global'><AiOutlineGlobal /></span>
        <Tooltip title={url}>
            <a target="_blank" rel="noopener noreferrer" href={url}>{url}</a>
        </Tooltip>
        <span className='tools'>
            <Tooltip title="Copy link" onClick={onCopyLink}>
                <span>
                    <FaRegCopy />
                </span>
            </Tooltip>
            <Tooltip title="Edit link" onClick={onEditLink}>
                <span>
                    <FaRegEdit />
                </span>
            </Tooltip>
            <Tooltip title="Remove link" onClick={onRemoveLink}>
                <span>
                    <FaUnlink />
                </span>
            </Tooltip>
        </span>
    </Paper>
}

export default LinkPopover;
