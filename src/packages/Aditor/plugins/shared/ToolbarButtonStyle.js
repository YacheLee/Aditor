import styled from 'styled-components';
import {DEFAULT_FONT_SIZE} from '../config';

const ToolbarButtonStyle = styled.div`
    font-size: ${DEFAULT_FONT_SIZE};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    color: ${(props) => props.disabled ? 'rgba(0, 0, 0, 0.26)' : ''};
    &:hover {
        cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    }
`;

export default ToolbarButtonStyle;
