import React from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import getValue from './getValue';
import HeadingToolbarButton from './components/HeadingToolbarButton';

class ToolbarView{
    constructor(editorView) {
        this.dom = this.toolbarButtonDom = document.createElement('div');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const value = getValue(editorView);

        ReactDOM.render(<HeadingToolbarButton toolbarButtonDom={this.toolbarButtonDom} editorView={editorView} value={value} />
        , this.dom);
    }
    update(editorView){
        this.renderReactComponent(editorView);
    }
    destroy() { this.dom.remove() }
}

function HeadingPlugin(toolbarDom){
    return new Plugin({
        view(editorView){
            const view = new ToolbarView(editorView);
            toolbarDom.append(view.dom);
            return view;
        },
        update(){
            return true;
        }
    });
}

export default HeadingPlugin;
