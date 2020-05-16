import findMediaSingleNode from "./findMediaSingleNode";

function setLayout({editorView, pos, layout}){
    const mediaSingleNode = findMediaSingleNode(editorView, pos);
    if(mediaSingleNode){
        editorView.dispatch(editorView.state.tr.setNodeMarkup(mediaSingleNode.pos, null, {layout}));
    }
}

export default setLayout;
