import React from 'react';
import ReactDOM from 'react-dom';
import ImageNodeView from './ImageNodeView';

class ProseMirrorNodeView {
  constructor(node, editorView, getPos) {
    this.dom = this.contentDom = document.createElement('div');
    this.node = node;
    this.focus = false;
    this.editorView = editorView;
    this.getPos = getPos;
    this.renderReactComponent();
  }

  renderReactComponent() {
    ReactDOM.render(<ImageNodeView
      node={this.node}
      editorView={this.editorView}
      getPos={this.getPos}
    />, this.contentDom);
  }

  destroy() {
    this.dom.remove();
  }
}

export default ProseMirrorNodeView;
