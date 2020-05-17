function setLayout({editorView, pos, layout}){
      editorView.dispatch(editorView.state.tr.setNodeMarkup(pos, null, {layout}));
}

export default setLayout;
