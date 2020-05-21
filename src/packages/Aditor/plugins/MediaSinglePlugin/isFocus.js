import {NodeSelection} from "prosemirror-state";

function isFocus(selection, pos, posEnd, node){
    if (selection instanceof NodeSelection) {
        if(selection.node === node){
            return true;
        }
        else if(pos === selection.from && posEnd === selection.to && selection.node.eq(node)){
            return true;
        }
    }
    return false;
}

export default isFocus;
