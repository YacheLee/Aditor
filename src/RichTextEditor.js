import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Schema} from 'prosemirror-model';
import styled from 'styled-components';
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Popover from './components/Popover';
import plugins from "./plugins";
import nodes from "./nodes";
import marks from "./marks";
import PopoverManager from './PopoverManager';
import './editor.css';

const Toolbar = styled.div`
  padding: 4px 8px 4px 14px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  display: flex;
  flex: 0 0 auto;
  flex-shrink: 0;
`;

function RichTextEditor({id, value}) {
    const editor = useRef(null);
    const toolbar = useRef(null);
    const [editorView, setEditorView] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState(null);

    PopoverManager.setPopoverAnchorElement = setAnchorEl;
    PopoverManager.setPopoverContent = setPopoverContent;
    PopoverManager.setAnchorEl(anchorEl);

    const init = useCallback(()=>{
        if(!editorView){
            const _plugins = plugins(toolbar.current);
            const schema = new Schema({ nodes, marks: marks(_plugins) });
            const doc = schema.nodeFromJSON({
                type: 'doc',
                content: value
            });
            const state = EditorState.create({
                doc,
                plugins: _plugins
            });
            setEditorView(new EditorView(editor.current, {state}));
        }
    }, [value, editorView]);

    useEffect(() => {
        init();
    }, [init]);

    return (
        <Paper style={{margin: 12}}>
            <Toolbar ref={toolbar} onMouseDown={e=>e.preventDefault()} />
            <Divider light />
            <div ref={editor} />
            {
                editorView && <Popover id={`popover_${id}`} anchorEl={anchorEl}>
                    {popoverContent}
                </Popover>
            }
        </Paper>
    );
}

RichTextEditor.propTypes = {

};

export default RichTextEditor;
