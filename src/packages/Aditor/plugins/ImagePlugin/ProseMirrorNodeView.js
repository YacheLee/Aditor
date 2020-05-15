import React from 'react';
import ReactDOM from 'react-dom';
import ImageNodeView from './ImageNodeView';

class ProseMirrorNodeView {
  constructor(node, editorView, getPos) {
    this.dom = document.createElement('div');
    this.node = node;
    this.focus = false;
    this.editorView = editorView;
    this.getPos = getPos;

    this.renderReactComponent();
  }

  renderReactComponent() {
    const pos = this.getPos();
    const node = this.editorView.state.doc.nodeAt(pos);

    ReactDOM.render(<ImageNodeView
      node={node}
      editorView={this.editorView}
      pos={pos}
    />, this.dom);
  }

  selectNode(){
    this.renderReactComponent();
  }

  deselectNode(){
    this.renderReactComponent();
  }

  update(){
    this.renderReactComponent();
    return true;
  }

  destroy() {
    this.dom.remove();
  }
}

export default ProseMirrorNodeView;
