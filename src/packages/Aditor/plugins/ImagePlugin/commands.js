export function setImageAttrs({pos, editorView, node, attrs}){
  const tr = editorView.state.tr;
  const toArr = {...node.attrs, ...attrs};
  tr.setNodeMarkup(pos, null, toArr);
  editorView.dispatch(tr);
}
