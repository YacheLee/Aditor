import {NodeSelection} from 'prosemirror-state';

export function setImageAttrs({pos, editorView, node, attrs}) {
    const {state, dispatch} = editorView;
    let {tr} = state;

    tr = tr.setNodeMarkup(pos, null, {...node.attrs, ...attrs});

    //doc after and doc before is different after setNodeMarkup!
    const nodeSelection = getNodeSelection(tr.doc, pos);
    tr = tr.setSelection(nodeSelection);
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
