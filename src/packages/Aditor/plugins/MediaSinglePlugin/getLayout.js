import findMediaSingleNode from "./findMediaSingleNode";
import {DEFAULT_LAYOUT} from "./node";

function setLayout({editorView, pos}){
    const mediaSingleNode = findMediaSingleNode(editorView, pos);
    if(mediaSingleNode){
        return mediaSingleNode.node.attrs.layout;
    }

    return DEFAULT_LAYOUT;
}

export default setLayout;
