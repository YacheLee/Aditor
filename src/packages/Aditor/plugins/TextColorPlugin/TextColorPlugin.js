import React from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import mark from './mark';
import {getColor} from './commands';
import TextColorToolbarButton from './TextColorToolbarButton';

class ToolbarView{
    constructor(editorView) {
        this.dom = this.toolbarButtonDom = document.createElement('div');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const value = getColor(editorView);
        ReactDOM.render(<TextColorToolbarButton toolbarButtonDom={this.toolbarButtonDom} editorView={editorView} value={value} />, this.toolbarButtonDom);
    }
    update(editorView){
        this.renderReactComponent(editorView);
    }
    destroy() { this.toolbarButtonDom.remove() }
}

function TextColorPlugin(toolbarDom){
    const pluginConfig = {
        view(editorView){
            const view = new ToolbarView(editorView);
            toolbarDom.append(view.dom);
            return view;
        },
        update(){
            return true;
        },
        mark
    };

    return new Plugin(pluginConfig);
}

export default TextColorPlugin;
