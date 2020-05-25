import React from 'react';
import ReactDOM from 'react-dom';
import MediaSingleReactView from './components/MediaSingleReactView';
import {setImageSize, setLayout} from './commands';
import setNodeSelection from "./setNodeSelection";
import isFocus from "./isFocus";
import {key} from "../SelectionPlugin";

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
        this.id = node.firstChild.attrs.id;

        this.dom.classList.add(`${node.type.name}View-content-wrap`);
        this.update(node);
        this.onSelectionChange = this.onSelectionChange.bind(this);

        key.getState(editorView.state).subscribe(this.id, this.onSelectionChange);
    }

    renderReactComponent(node) {
        const pos = this.getPos();
        const posEnd = pos + node.nodeSize;
        const {attrs, firstChild: mediaNode} = node;
        const {id, src, title, width, height} = mediaNode.attrs;
        const {layout} = attrs;
        const editorView = this.editorView;
        const focus = isFocus(editorView.state.selection, pos, posEnd, node);

        ReactDOM.render(<MediaSingleReactView
            id={id}
            focus={focus}
            src={src}
            title={title}
            width={width}
            height={height}
            layout={layout}
            onLayoutChange={layout=>{
                setLayout({editorView, layout, pos: this.getPos()})
            }}
            onImageClick={() => {
                if(!focus){
                    setNodeSelection(this.editorView, this.getPos());
                }
            }}
            onResizeEnd={({width, height}) => {
                const nodeMedia = getNodeMedia(node);
                const mediaSinglePos = pos;
                const mediaPos = pos+1;
                setImageSize({editorView, attrs: nodeMedia.attrs, mediaSinglePos, mediaPos, width, height});
            }}
        />, this.dom);
    }

    update(node){
        this.node = node;
        this.renderReactComponent(node);
        return true;
    }

    destroy() {
        key.getState(this.editorView.state).unsubscribe(this.id);
        this.dom.remove();
    }

    onSelectionChange(){
        this.update(this.node);
    }
}

export default MediaSingleProseMirrorNodeView;
