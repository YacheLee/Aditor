import React, {useContext} from 'react';
import {redo} from 'prosemirror-history';
import EditorViewContext from '../../../contexts/EditorViewContext';
import styled from 'styled-components';
import {MdRedo} from 'react-icons/md';
import {DEFAULT_ICON_FONT_SIZE} from '../../../config';

const Wrapper = styled(MdRedo)`
  font-size: ${DEFAULT_ICON_FONT_SIZE};
  color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.26)' : 'rgba(0, 0, 0, 0.54)'};
  
  &:hover{
    cursor: ${props => props.disabled ? "not-allowed" : "cursor"};
  } 
`;

function RedoButton(){
    const {editorView} = useContext(EditorViewContext);
    const disabled = !redo(editorView.state);

    return <Wrapper disabled={disabled} onClick={()=>{
        if(!disabled){
            redo(editorView.state, editorView.dispatch);
        }
    }}/>
}

export default RedoButton;
