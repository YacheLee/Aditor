import React from 'react';
import ReactDOM from 'react-dom';
import MediaSingleReactView from './components/MediaSingleReactView';
import getStyle from './getStyle';
import {setImageSize, setLayout} from './commands';

function getNodeMediaId(node) {
    if (node.firstChild) {
        return node.firstChild.attrs.id;
    }
    return undefined;
}

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
        Object.keys(styleObj).forEach(key => {
            this.dom.style[key] = styleObj[key];
        });

        const {attrs, firstChild: mediaNode} = node;
        const {id, src, title, width, height} = mediaNode.attrs;
        const {layout} = attrs;
        const focus = this.nodeFocus && this.imageFocus;
        const editorView = this.editorView;

        ReactDOM.render(<MediaSingleReactView
            layout={layout}
            id={id}
            src={src}
            title={title}
            width={width}
            height={height}
            focus={focus}
            node={node}
            getPos={this.getPos}
            editorView={editorView}
            onLayoutChange={layout => {
                const pos = this.getPos();
                setLayout({pos, editorView, layout});
            }}
            onResizeEnd={({width, height}) => {
                setImageSize({editorView, mediaNode: node.firstChild, width, height});
            }}
            onImageClick={() => {
                this.imageFocus = true;
                this.renderReactComponent(node);
            }}
        />, this.dom);
    }

    update(node) {
        const isValidUpdate = node.type===this.node.type && getNodeMediaId(node) === getNodeMediaId(this.node);

        if(!isValidUpdate){
            return false;
        }

        this.node = node;
        this.renderReactComponent(node);
        return true;
    }

    selectNode() {
        this.nodeFocus = true;
        this.imageFocus = false;
        this.renderReactComponent(this.node);
    }

    deselectNode() {
        this.nodeFocus = false;
        this.imageFocus = false;
        this.renderReactComponent(this.node);
    }


    destroy() {
        this.dom.remove();
    }
}

export default MediaSingleProseMirrorNodeView;
