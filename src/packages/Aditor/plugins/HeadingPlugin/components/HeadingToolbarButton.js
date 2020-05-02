import React, {Fragment} from 'react';
import styled from 'styled-components';
import {MdArrowDropDown} from 'react-icons/md';
import {BLACK_COLOR} from '../../config';
import getLabel from '../getLabel';
import ToolbarButtonStyle from '../../shared/ToolbarButtonStyle';
import HeadingList from './HeadingList';
import onHeadingClick from '../onHeadingClick';
import PopoverManager from '../../../PopoverManager';

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToolbarButton = styled(ToolbarButtonStyle)`
  color: ${BLACK_COLOR};
  margin-right: 0;
  min-width: 120px;
  font-size: 20px;
  &:hover{
    cursor: pointer;
  }
`;

function HeadingToolbarButton({editorView, value, toolbarButtonDom}) {
    const label = getLabel(value);

    return (
        <Fragment>
            <ToolbarButton onClick={(e)=>{
                e.preventDefault();

                //toggle
                if(PopoverManager.getAnchorEl()===toolbarButtonDom){
                    PopoverManager.closePopover();
                }
                else{
                    PopoverManager.setPopoverAnchorElement(toolbarButtonDom);
                    PopoverManager.setPopoverContent(
                        <HeadingList onClick={(level)=>{
                            onHeadingClick(editorView, level);
                            PopoverManager.setPopoverAnchorElement(null);
                        }} />);
                }
            }}>
                <CenterBox>{label}</CenterBox>
                <CenterBox>
                    <MdArrowDropDown/>
                </CenterBox>
            </ToolbarButton>
        </Fragment>
    );
}

HeadingToolbarButton.defaultProps = {};

HeadingToolbarButton.propTypes = {};

export default HeadingToolbarButton;
