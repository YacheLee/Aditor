import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BottomRightDot from './BottomRightDot';
import { setImageAttrs } from '../commands';

const Wrapper = styled.div`
  position: relative;
`;

const ResizableImage = styled.img`
  cursor: move;
`;

function Component({ node, editorView, pos, focus, onResize, onResizeEnd }) {
  const imageRef = useRef(null);
  const { src, title, width: _width, height: _height } = node.attrs;

  const [width, setWidth] = useState(_width);
  const [height, setHeight] = useState(_height);

  return <Wrapper>
    <div>
      <ResizableImage
        ref={imageRef}
        width={width}
        height={height}
        src={src}
        title={title}
      />
      {focus && <BottomRightDot
        imageRef={imageRef}
        onResize={({ width, height }) => {
          setWidth(width);
          setHeight(height);
          onResize();
        }}
        onResizeEnd={({ width, height }) => {
          const attrs = { width, height };
          setImageAttrs({ pos, editorView, node, attrs });
          onResizeEnd();
        }}
      />
      }
    </div>
  </Wrapper>;
}

Component.defaultProps = {
  onResize: ()=>{},
  onResizeEnd: ()=>{},
};

Component.propTypes = {
  onResize: PropTypes.func,
  onResizeEnd: PropTypes.func
};

export default Component;
