import React from 'react';
import ReactDOM from 'react-dom';
import MediaSingleNodeView from './components/MediaSingleNodeView';
import getStyle from './getStyle';

class MediaSingleProseMirrorNodeView {
  constructor(node, editorView, getPos) {
    this.dom = document.createElement('div');
    this.nodeFocus = false;
    this.imageFocus = false;
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

    const focus = this.nodeFocus && this.imageFocus;

    ReactDOM.render(<MediaSingleNodeView
      focus={focus}
      node={node}
      getPos={this.getPos}
      editorView={this.editorView}
      onImageClick={()=>{
        this.imageFocus = true;
        this.renderReactComponent(node);
      }}
    />, this.dom);
  }

  update(node){
    this.node = node;
    this.renderReactComponent(node);
    return true;
  }

  selectNode(){
    this.nodeFocus = true;
    this.imageFocus = false;
    this.renderReactComponent(this.node);
  }

  deselectNode(){
    this.nodeFocus = false;
    this.imageFocus = false;
    this.renderReactComponent(this.node);
  }


  destroy() {
    this.dom.remove();
  }
}

export default MediaSingleProseMirrorNodeView;
