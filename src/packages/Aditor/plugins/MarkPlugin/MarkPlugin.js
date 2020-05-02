import React from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import {toggleMark} from "prosemirror-commands";
import {keydownHandler} from "prosemirror-keymap";
import {isActive} from './utils';
import ToolbarActiveButtonStyle from '../shared/ToolbarActiveButtonStyle';

function MarkPlugin(toolbarDom, Icon, mark, markType, attr, hotkey){
    function toggle(editorState, dispatch){
        toggleMark(editorState.schema.marks[markType], {[attr]: true})(editorState, dispatch);
    }

    class ToolbarView{
        constructor(editorView) {
            this.dom = this.toolbarButtonDom = document.createElement('div');
            this.renderReactComponent(editorView);
        }
        renderReactComponent(editorView){
            const mark = editorView.state.schema.marks[markType];

            ReactDOM.render(<ToolbarActiveButtonStyle isActive={isActive(editorView.state, mark)}  onClick={e=>{
                e.preventDefault();
                editorView.focus();
                toggle(editorView.state, editorView.dispatch);
            }}>
                <Icon />
            </ToolbarActiveButtonStyle>, this.toolbarButtonDom);
        }
        update(editorView){
            this.renderReactComponent(editorView);
        }
        destroy() { this.toolbarButtonDom.remove() }
    }

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

    if(!!hotkey){
        pluginConfig.props = {
            handleKeyDown: keydownHandler({
                [hotkey]: toggle
            })
        };
    }

    return new Plugin(pluginConfig);
}

export default MarkPlugin;
