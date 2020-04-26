import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {BLACK_COLOR, BORDER_RADIUS, DEFAULT_ICON_FONT_SIZE, GREY_COLOR} from "../../../config";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${BORDER_RADIUS}px;
  background-color: ${props=> props.isActive ? BLACK_COLOR : "white"};
  color: ${props=> props.isActive ? "white": BLACK_COLOR};
  font-size: ${DEFAULT_ICON_FONT_SIZE};
  
  &:hover{
    cursor: pointer;
    background-color: ${props=> props.isActive ? BLACK_COLOR : GREY_COLOR};
    color: ${props=> props.isActive ? "white" : BLACK_COLOR};
  }
`;

function ToolbarButton({onClick, isActive, ...props}){
    return <Wrapper isActive={isActive}>
        <props.component onClick={onClick} />
    </Wrapper>
}

ToolbarButton.defaultProps = {
    isActive: false,
    onClick: ()=>{}
};

ToolbarButton.propTypes = {
    component: PropTypes.elementType.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func
};

export default ToolbarButton;
