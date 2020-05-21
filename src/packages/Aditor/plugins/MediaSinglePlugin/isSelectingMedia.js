import {name} from "./nodes/media";

function isSelectingMedia(editorView){
    if(editorView && editorView.state && editorView.state.selection){
        const node = editorView.state.doc.nodeAt(editorView.state.selection.from)
        if(node && node.type && node.type.name){
            return node.type.name === name;
        }
    }
    return false;
}

export default isSelectingMedia;
