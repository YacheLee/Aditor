import React, {useContext} from 'react';
import {MdUndo} from 'react-icons/md';
import {undo} from 'prosemirror-history';
import EditorViewContext from '../../../contexts/EditorViewContext';
import styled from 'styled-components';
import {DEFAULT_ICON_FONT_SIZE} from '../../../config';

const Wrapper = styled(MdUndo)`
  font-size: ${DEFAULT_ICON_FONT_SIZE};
  color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.26)' : 'rgba(0, 0, 0, 0.54)'};
  
  &:hover{
    cursor: ${props => props.disabled ? "not-allowed" : "cursor"};
  } 
`;

function UndoButton(){
    const {editorView} = useContext(EditorViewContext);
    const disabled = !undo(editorView.state);

    return <Wrapper disabled={disabled} onClick={()=>{
        if(!disabled){
            undo(editorView.state, editorView.dispatch);
        }
    }}/>
}

export default UndoButton;
