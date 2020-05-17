export function setImageSize({editorView, attrs, pos, width, height}){
  editorView.dispatch(
    editorView.state.tr.setNodeMarkup(pos, undefined, {
      ...attrs,
      width,
      height
    })
  );
}

export function setLayout({editorView, pos, layout}){
  editorView.dispatch(editorView.state.tr.setNodeMarkup(pos, null, {layout}));
}
