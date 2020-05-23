import React from 'react';
import ReactDOM from 'react-dom';
import MediaSingleReactView from './components/MediaSingleReactView';
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

        this.dom.classList.add(`${node.type.name}View-content-wrap`);
        this.renderReactComponent(node);
    }

    renderReactComponent(node) {
        const pos = this.getPos();
        const posEnd = pos + node.nodeSize;
        const {attrs, firstChild: mediaNode} = node;
        const {id, src, title, width, height} = mediaNode.attrs;
        const {layout} = attrs;

        const focus = isFocus(this.editorView.state.selection, pos, posEnd, node);
        const editorView = this.editorView;

        ReactDOM.render(<MediaSingleReactView
            id={id}
            src={src}
            title={title}
            width={width}
            height={height}
            layout={layout}
            focus={focus}
            onLayoutChange={layout => {
                setLayout({pos, editorView, layout});
            }}
            onImageClick={() => {
                setNodeSelection(this.editorView, this.getPos());
                this.renderReactComponent(node);
            }}
            onResizeEnd={({width, height}) => {
                const nodeMedia = getNodeMedia(node);
                setImageSize({editorView, attrs: nodeMedia.attrs, pos: pos+1, width, height});
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
