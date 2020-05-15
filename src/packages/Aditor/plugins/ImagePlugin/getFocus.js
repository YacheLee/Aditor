export default function getFocus(editorView, pos) {
  if(editorView.state && editorView.state.selection){
    return editorView.state.selection.from === pos;
  }
  return false;
}
