import React from "react";
import ReactDOM from "react-dom";
import {MdUndo} from "react-icons/md";
import {undo} from "prosemirror-history";
import {keydownHandler} from "prosemirror-keymap";
import {Plugin} from 'prosemirror-state';
import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';

class UndoView{
    constructor(editorView) {
        this.dom = document.createElement('div');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const disabled = !undo(editorView.state);

        ReactDOM.render(<ToolbarButtonStyle disabled={disabled} onClick={e=>{
            e.preventDefault();
            editorView.focus();
            undo(editorView.state, editorView.dispatch);
        }}>
            <MdUndo />
        </ToolbarButtonStyle>, this.dom);
    }
    update(editorView){
        this.renderReactComponent(editorView);
    }
    destroy() { this.dom.remove() }
}

function UndoPlugin(toolbarDom){
    return new Plugin({
        view(editorView){
            const view = new UndoView(editorView, toolbarDom);
            toolbarDom.append(view.dom);
            return view;
        },
        props: {
            handleKeyDown: keydownHandler({
                "Mod-z": undo
            })
        },
        update(){
            return true;
        }
    });
}

export default UndoPlugin;
