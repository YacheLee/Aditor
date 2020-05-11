import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { setImageSize } from '../commands';

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

function Component({node, editorView, getPos}){
  const { src, alt, title, width: _width, height: _height } = node.attrs;
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(_width);
  const [height, setHeight] = useState(_height);

  const handleClose = ()=> setOpen(false);
  const handleOpen = ()=> setOpen(true);

  return <Fragment>
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Image options
      </DialogTitle>
      <DialogContent>
          <div>
              Width: <input type="number" value={width} onChange={e=>{
                setWidth(e.target.value);
          }} />
          </div>
          <div>
              Height: <input type="number" value={height} onChange={e=>{
                setHeight(e.target.value);
              }} />
          </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>{
          setImageSize({pos: getPos(), editorView, node, width, height});
          handleClose();
        }} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
    <Image
      onClick={handleOpen}
      width={width}
      height={height}
      src={src}
      alt={alt}
      title={title}
    />
  </Fragment>
}

export default Component;
