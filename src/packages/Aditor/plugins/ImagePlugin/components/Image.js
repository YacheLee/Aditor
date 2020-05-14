import React, {Fragment, useState} from 'react';
import styled from 'styled-components';
import {Resizable} from 're-resizable';
import ImageDialog from './ImageDialog';
import {setImageAttrs} from "../commands";

const Image = styled.img`
  &:hover{
    cursor: pointer;
  }
`;

export const MIN_SIZE = 20;
export const MAX_SIZE = 10000;

function clamp(min, value, max){
  return Math.min(Math.max(value, min), max);
}

function Component({node, editorView, getPos}) {
    const {src, title, width: _width, height: _height} = node.attrs;

    const [open, setOpen] = useState(false);
    const [width, setWidth] = useState(_width);
    const [height, setHeight] = useState(_height);

    return <Fragment>
        {open && <ImageDialog
            open={open}
            editorView={editorView}
            node={node}
            getPos={getPos}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
        />}
        <Resizable
            size={{width, height}}
            onResize={(e, direction, ref, d) => {
              const dx = d.width;
              const dy = d.height;

              const aspect = _width / _height;
              let ww = clamp(MIN_SIZE, _width + Math.round(dx), MAX_SIZE);
              let hh = clamp(MIN_SIZE, _height + Math.round(dy), MAX_SIZE);

              hh = Math.max(ww / aspect, MIN_SIZE);
              ww = hh * aspect;
              setWidth(ww);
              setHeight(hh);
            }}
            onResizeStop={(e, direction, ref, d) => {
                const attrs = {width, height};
                setImageAttrs({pos: getPos(), editorView, node, attrs});
            }}
        >
            <Image
                onClick={() => setOpen(true)}
                width={width}
                height={height}
                src={src}
                title={title}
            />
        </Resizable>
    </Fragment>
}

export default Component;
