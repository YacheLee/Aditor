import styled from 'styled-components';
import {BLACK_COLOR, DEFAULT_FONT_SIZE, GREY_COLOR, TOOLBAR_BUTTON_SIZE} from '../config';

const ToolbarActiveButtonStyle = styled.div`
    font-size: ${DEFAULT_FONT_SIZE};
    width: ${TOOLBAR_BUTTON_SIZE}px;
    height: ${TOOLBAR_BUTTON_SIZE}px;
    display: flex;
    justify-content: center;
    align-items: center;
      
    &:hover{
        cursor: pointer;
    }

    svg {
      background-color: ${(props) => (props.isActive ? BLACK_COLOR : 'white')};
      color: ${(props) => (props.isActive ? 'white' : BLACK_COLOR)};
      border-radius: 5px;
      
      &:hover{
        background-color: ${(props) => (props.isActive ? BLACK_COLOR : GREY_COLOR)};
        color: ${(props) => (props.isActive ? 'white' : BLACK_COLOR)};
      }
    }
`;

export default ToolbarActiveButtonStyle;
