import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import BottomRightDot from './BottomRightDot';
import { setImageAttrs } from '../commands';
import { changeColor } from '../../TextColorPlugin/commands';

const Wrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  cursor: move;
`;

function Component({node, editorView, getPos}) {
    const imageRef = useRef(null);
    const {src, title, width: _width, height: _height} = node.attrs;

    const [isResizing, setIsResizing] = useState(false);
    const [width, setWidth] = useState(_width);
    const [height, setHeight] = useState(_height);
    const nodePos = getPos();

  return <Wrapper>
    <ClickAwayListener onClickAway={() => {
      setIsResizing(false);
    }}>
      <div>
        <Image
          ref={imageRef}
          onClick={e => {
            e.preventDefault();
            setIsResizing(true);
          }}
          width={width}
          height={height}
          src={src}
          title={title}
        />
        {isResizing && <BottomRightDot
          imageRef={imageRef}
          onResize={({ width, height }) => {
            setWidth(width);
            setHeight(height);
          }}
          onResizeEnd={({ width, height }) => {
            const attrs = { width, height };
            setImageAttrs({ pos: nodePos, editorView, node, attrs });
          }}
        />
        }
      </div>
    </ClickAwayListener>
  </Wrapper>;
}

export default Component;
