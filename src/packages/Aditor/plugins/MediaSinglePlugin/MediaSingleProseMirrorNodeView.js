import React from 'react';
import ReactDOM from 'react-dom';
import MediaSingleNode from './components/MediaSingleNode';
import getStyle from './getStyle';

class MediaSingleProseMirrorNodeView {
  constructor(node, editorView, getPos) {
    this.dom = document.createElement('div');
    this.focus = false;
    this.node = node;
    this.editorView = editorView;
    this.getPos = getPos;

    this.dom.classList.add(`${this.node.type.name}View-content-wrap`);
    this.dom.contentEditable = true;
    this.renderReactComponent(node);
  }

  renderReactComponent(node) {
    const styleObj = getStyle(node.attrs.layout);
    this.dom.style = {};
    Object.keys(styleObj).forEach(key=>{
      this.dom.style[key] = styleObj[key];
    });

    ReactDOM.render(<MediaSingleNode
      focus={this.focus}
      node={node}
      getPos={this.getPos}
      editorView={this.editorView}
    />, this.dom);
  }

  update(node){
    this.node = node;
    this.renderReactComponent(node);
    return true;
  }

  selectNode(){
    this.focus = true;
    this.renderReactComponent(this.node);
  }

  deselectNode(){
    this.focus = false;
    this.renderReactComponent(this.node);
  }


  destroy() {
    this.dom.remove();
  }
}

export default MediaSingleProseMirrorNodeView;
