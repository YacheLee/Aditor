import {NodeSelection} from 'prosemirror-state';

export function setImageAttrs({pos, editorView, node, attrs}) {
    const {state, dispatch} = editorView;
    const {tr} = state;
    tr.setNodeMarkup(pos, null, {...node.attrs, ...attrs});
    tr.setSelection(getNodeSelection(tr.doc, pos));
    dispatch(tr);
}

function getNodeSelection(doc, pos) {
    return NodeSelection.create(doc, pos);
}

export function selectNode(editorView, pos) {
    const tr = editorView.state.tr;
    const nodeSelection = getNodeSelection(tr.doc, pos);
    editorView.dispatch(tr.setSelection(nodeSelection));
}
