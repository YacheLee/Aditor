import React from 'react';
import ReactDOM from 'react-dom';
import Image from './components';

class ImageView {
  constructor(node, editorView, getPos) {
    const div = document.createElement('div');
    div.style.display = "inline-block";
    this.dom = div;
    ReactDOM.render(<Image node={node} editorView={editorView} getPos={getPos} />, div);
  }
}

export default ImageView;
