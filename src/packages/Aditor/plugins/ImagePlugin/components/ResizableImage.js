import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import BottomRightDot from './BottomRightDot';
import { setImageAttrs } from '../commands';

const Wrapper = styled.div`
  position: relative;
`;

const ResizableImage = styled.img`
  cursor: move;
`;

function Component({node, editorView, pos, onResize, onResizeEnd}) {
    const imageRef = useRef(null);
    const {src, title, width: _width, height: _height} = node.attrs;

    const [focus, setFocus] = useState(false);
    const [width, setWidth] = useState(_width);
    const [height, setHeight] = useState(_height);

  return <Wrapper>
    <ClickAwayListener onClickAway={() => {
      setFocus(false);
    }}>
      <div>
        <ResizableImage
          ref={imageRef}
          onClick={e => {
            e.preventDefault();
            setFocus(true);
          }}
          width={width}
          height={height}
          src={src}
          title={title}
        />
        {focus && <BottomRightDot
          imageRef={imageRef}
          onResize={({ width, height }) => {
            onResize();
            setWidth(width);
            setHeight(height);
          }}
          onResizeEnd={({ width, height }) => {
            onResizeEnd();
            const attrs = { width, height };
            setImageAttrs({ pos, editorView, node, attrs });
          }}
        />
        }
      </div>
    </ClickAwayListener>
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
