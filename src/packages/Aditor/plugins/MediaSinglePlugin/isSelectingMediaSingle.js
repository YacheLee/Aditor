import {name} from "./nodes/mediaSingle";
import {NodeSelection} from "prosemirror-state";

function isSelectingMediaSingle(selection){
    if (selection instanceof NodeSelection) {
        return selection.node.type.name === name;
    }
    return false;
}

export default isSelectingMediaSingle;
