import styled from 'styled-components';
import {BLACK_COLOR, BORDER_RADIUS, GREY_COLOR} from '../../config';

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  padding: 0 2px;
  color: ${BLACK_COLOR};
  border-radius: ${BORDER_RADIUS};

  &:hover {
    cursor: pointer;
    background-color: ${GREY_COLOR};
  }
`;

export default ButtonStyle;
