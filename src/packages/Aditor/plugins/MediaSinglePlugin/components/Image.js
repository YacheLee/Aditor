import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Image = styled.img`
  cursor: move;
`;

function Component({src, title, width, height, onClick}) {
  return <Image
        width={width}
        height={height}
        src={src}
        title={title}
        onClick={onClick}
    />
}

Component.defaultProps = {
  src: "",
  title: ""
};

Component.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Component;
