import {NodeSelection} from 'prosemirror-state';

export function setImageAttrs({pos, editorView, node, attrs}) {
    const {state, dispatch} = editorView;
    const {tr} = state;
    dispatch(tr.setNodeMarkup(pos, null, {...node.attrs, ...attrs}));

    //AD-57 Because the image is gone for a while, it will select the other blocks, we have to set the selection to fix this bug.
    window.setTimeout(()=>{
        selectNode(editorView, pos);
    }, 0.0000000001)
}

function getNodeSelection(doc, pos) {
    return NodeSelection.create(doc, pos);
}

export function selectNode(editorView, pos) {
    const tr = editorView.state.tr;
    const nodeSelection = getNodeSelection(tr.doc, pos);
    editorView.dispatch(tr.setSelection(nodeSelection));
}
