import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { findParentNodeOfType } from 'prosemirror-utils';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { setImageAttrs } from '../commands';
import { updateLayout } from '../../MediaSinglePlugin/commands';
import ImageDialog from './ImageDialog';

const Image = styled.img`
  &:hover{
    cursor: pointer;
  }
`;

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function getLayout(mediaSingleNode){
  if(!mediaSingleNode) return 'left';

  return mediaSingleNode.node.attrs.layout;
}

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
