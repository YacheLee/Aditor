export function setImageSize({editorView, mediaNode, width, height}){
  const pos = editorView.state.selection.from+1;
  editorView.dispatch(
    editorView.state.tr.setNodeMarkup(pos, undefined, {
      ...mediaNode.attrs,
      width,
      height
    })
  );
}
