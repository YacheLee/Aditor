import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BottomRightDot from './BottomRightDot';
import { selectNode, setImageAttrs } from '../commands';

const Wrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  cursor: move;
`;

function Component({ node, editorView, pos, focus }) {
  const imageRef = useRef(null);
  const { src, title, width: _width, height: _height } = node.attrs;

  const [width, setWidth] = useState(_width);
  const [height, setHeight] = useState(_height);

  return <Wrapper>
    <div>
      <Image
        ref={imageRef}
        width={width}
        height={height}
        src={src}
        title={title}
        onClick={()=>{
          selectNode(editorView, pos);
        }}
      />
      {focus && <BottomRightDot
        imageRef={imageRef}
        onResize={({ width, height }) => {
          setWidth(width);
          setHeight(height);
        }}
        onResizeEnd={({ width, height }) => {
          const attrs = { width, height };
          setImageAttrs({ pos, editorView, node, attrs });
          selectNode(editorView, pos);
        }}
      />
      }
    </div>
  </Wrapper>;
}

Component.defaultProps = {
};

Component.propTypes = {
};

export default Component;
