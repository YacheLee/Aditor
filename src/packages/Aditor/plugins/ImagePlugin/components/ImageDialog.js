import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function Component({title, setTitle, width, setWidth, height, setHeight, layout, setLayout, onApply, onClose}){
  return <Dialog
      open={true}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Image options
      </DialogTitle>
      <DialogContent>
        <div>
          Title: <input type="text" value={title} onChange={e=>{
          setTitle(e.target.value);
        }} />
        </div>
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
        <div>
          Alignment: <select value={layout} onChange={e=>{
          setLayout(e.target.value);
        }}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onApply} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
}

export default Component;
