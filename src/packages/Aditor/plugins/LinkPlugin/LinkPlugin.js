import React from 'react';
import {Plugin} from 'prosemirror-state';
import ReactDOM from 'react-dom';

import mark from './mark';
import onLinkClick from './onLinkClick';
import LinkToolbarButton from './components/LinkToolbarButton';

import './LinkPlugin.css';

class View{
    constructor(editorView) {
        this.dom = this.toolbarButtonDom = document.createElement('div');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        ReactDOM.render(<LinkToolbarButton toolbarButtonDom={this.toolbarButtonDom} editorView={editorView} />, this.toolbarButtonDom);
    }
    update(editorView){
        this.renderReactComponent(editorView);
    }
    destroy() { this.toolbarButtonDom.remove() }
}

function LinkPlugin(toolbarDom){
    return new Plugin({
        view(editorView){
            const view = new View(editorView, toolbarDom);
            toolbarDom.append(view.dom);
            return view;
        },
        update(){
            return true;
        },
        mark,
        props: {
            handleClick: onLinkClick
        }
    });
}

export default LinkPlugin;
