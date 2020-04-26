import React, {useContext} from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {MdInsertLink as Link} from 'react-icons/md';
import {BLACK_COLOR, DEFAULT_ICON_FONT_SIZE} from "../../../config";
import {EditorViewContext} from '../../../contexts';
import {canLinkBeCreatedInRange, getActiveText, insertLink} from '../../../utils';
import CentralFlexbox from '../../../styles/CentralFlexbox';

const Root = styled(CentralFlexbox("div"))`
  font-size: ${DEFAULT_ICON_FONT_SIZE};
  color: ${props => props.disabled ? "grey" : BLACK_COLOR};
  
  &:hover{
    cursor: ${props => props.disabled ? "not-allowed" : "cursor"};
  }
`;

function LinkButton(){
    const {editorView} = useContext(EditorViewContext);
    const disabled = !canLinkBeCreatedInRange(editorView.state.selection.from, editorView.state.selection.to)(editorView.state);

    return <Root disabled={disabled}>
        <Link onClick={()=>{
            if(!disabled){
                const url = window.prompt('Enter the URL of the link:');
                if (!url) return;

                const text = getActiveText(editorView.state.selection);
                const {from, to} = editorView.state.selection;
                const command = insertLink(from, to, url, text);
                command(editorView.state, editorView.dispatch);
            }
        }}/>
    </Root>
}

LinkButton.defaultProps = {
    onClick: ()=>{}
};

LinkButton.propTypes = {
    onClick: PropTypes.func
};

export default LinkButton;
