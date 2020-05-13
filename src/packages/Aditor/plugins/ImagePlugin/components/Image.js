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
                setWidth(_width + d.width);
                setHeight(_height + d.height);
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
