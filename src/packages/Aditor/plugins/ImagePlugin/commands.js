import { NodeSelection } from 'prosemirror-state';

export function setImageAttrs({pos, editorView, node, attrs}){
  const tr = editorView.state.tr;
  const toArr = {...node.attrs, ...attrs};
  tr.setNodeMarkup(pos, null, toArr);
  editorView.dispatch(tr);
}

export function selectNode(editorView, pos){
  const nodeSelection = NodeSelection.create(editorView.state.doc, pos);
  const tr = editorView.state.tr;
  tr.setSelection(nodeSelection);
  editorView.dispatch(tr);
}
