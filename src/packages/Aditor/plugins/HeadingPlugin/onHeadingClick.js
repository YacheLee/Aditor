import {PARAGRAPH_VALUE} from './config';
import {setBlockType} from 'prosemirror-commands';

function onHeadingClick(editorView, level){
    editorView.focus();
    if (level === PARAGRAPH_VALUE) {
        const nodeType = editorView.state.schema.nodes.paragraph;
        setBlockType( nodeType )(editorView.state, editorView.dispatch);
    }
    else{
        const nodeType = editorView.state.schema.nodes.heading;
        setBlockType(nodeType, { level })(editorView.state, editorView.dispatch);
    }
}

export default onHeadingClick;
