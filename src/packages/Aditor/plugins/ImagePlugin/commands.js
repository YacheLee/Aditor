export function setImageSize({pos, editorView, node, width, height}){
  const tr = editorView.state.tr;
  const toArr = {...node.attrs, width, height};
  tr.setNodeMarkup(pos, null, toArr);
  editorView.dispatch(tr);
}
