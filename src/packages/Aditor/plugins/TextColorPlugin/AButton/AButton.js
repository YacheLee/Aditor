import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {DEFAULT_FONT_SIZE} from '../../config';

const Root = styled.svg`
  height: ${DEFAULT_FONT_SIZE};
`;

function AButton({ color, onClick }) {
  return (
    <Root
      onClick={onClick}
      focusable='false'
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <g>
        <path fill={color} d='M0 20h24v4H0z' />
        <path d='M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z' />
      </g>
    </Root>
  );
}

AButton.defaultProps = {
  color: 'blue',
  onClick: () => {}
};

AButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func
};

export default AButton;
