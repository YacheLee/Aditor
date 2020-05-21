import React from 'react';
import ReactDOM from 'react-dom';
import MediaSingleReactView from './components/MediaSingleReactView';
import getStyle from './getStyle';
import {setImageSize, setLayout} from './commands';
import setNodeSelection from "./setNodeSelection";
import isFocus from "./isFocus";

function getNodeMedia(node) {
    if (node.firstChild) {
        return node.firstChild;
    }
    return undefined;
}

class MediaSingleProseMirrorNodeView {
    constructor(node, editorView, getPos) {
        this.dom = document.createElement('div');
        this.node = node;
        this.editorView = editorView;
        this.getPos = getPos;

        this.dom.classList.add(`${this.node.type.name}View-content-wrap`);
        this.dom.contentEditable = true;
        this.renderReactComponent(node);
    }

    renderReactComponent(node) {
        const pos = this.getPos();
        const posEnd = pos + node.nodeSize;
        const styleObj = getStyle(node.attrs.layout);
        this.dom.style = {};
        Object.keys(styleObj).forEach(key => {
            this.dom.style[key] = styleObj[key];
        });

        const {attrs, firstChild: mediaNode} = node;
        const {id, src, title, width, height} = mediaNode.attrs;
        const {layout} = attrs;

        const focus = isFocus(this.editorView.state.selection, pos, posEnd, node);
        const editorView = this.editorView;

        ReactDOM.render(<MediaSingleReactView
            layout={layout}
            id={id}
            src={src}
            title={title}
            width={width}
            height={height}
            focus={focus}
            editorView={editorView}
            onLayoutChange={layout => {
                setLayout({pos, editorView, layout});
            }}
            onResizeEnd={({width, height}) => {
                const nodeMedia = getNodeMedia(node);
                setImageSize({editorView, attrs: nodeMedia.attrs, pos: pos+1, width, height});
            }}
            onImageClick={() => {
                setNodeSelection(this.editorView, this.getPos());
                this.renderReactComponent(node);
            }}
            onBlur={()=>{
                this.renderReactComponent(node);
            }}
        />, this.dom);
    }

    update(node) {
        this.node = node;
        this.renderReactComponent(node);
        return true;
    }

    destroy() {
        this.dom.remove();
    }
}

export default MediaSingleProseMirrorNodeView;
