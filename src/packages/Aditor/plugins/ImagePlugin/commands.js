import {NodeSelection} from 'prosemirror-state';

export function setImageAttrs({pos, editorView, node, attrs}){
  const tr = editorView.state.tr;
  const toArr = {...node.attrs, ...attrs};
  tr.setNodeMarkup(pos, null, toArr);
  editorView.dispatch(tr);
}

function getNodeSelection(editorView, pos){
    return NodeSelection.create(editorView.state.doc, pos);
}

export function selectNode(editorView, pos){
    window.setTimeout(e => {
        const nodeSelection = getNodeSelection(editorView, pos);
        const tr = editorView.state.tr;
        tr.setSelection(nodeSelection);
        editorView.dispatch(tr);
    }, 0.000000005);
}
