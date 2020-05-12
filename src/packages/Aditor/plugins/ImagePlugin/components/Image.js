import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import ImageDialog from './ImageDialog';

const Image = styled.img`
  &:hover{
    cursor: pointer;
  }
`;

function Component({node, editorView, getPos}){
  const { src, title, width, height } = node.attrs;

  const [open, setOpen] = useState(false);

  return <Fragment>
    {open && <ImageDialog
      open={open}
      editorView={editorView}
      node={node}
      getPos={getPos}
      onOpen={()=>setOpen(true)}
      onClose={()=>setOpen(false)}
    />}
    <Image
      onClick={()=>setOpen(true)}
      width={width}
      height={height}
      src={src}
      title={title}
    />
  </Fragment>
}

export default Component;
