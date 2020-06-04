import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Schema } from 'prosemirror-model';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import PopoverWithClickAway from './components/PopoverWithClickAway';
import plugins from './plugins';
import nodes from './nodes';
import marks from './marks';
import PopoverManager from './PopoverManager';
import normaliseValue from './normaliseValue';
import ProseMirrorStyle from './ProseMirrorStyle';
import nodeViews from './nodeViews';
import { toolbar } from './zIndex';

const Toolbar = styled.div`
  padding: 4px 8px 4px 14px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: ${toolbar};
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  display: flex;
  flex: 0 0 auto;
  flex-shrink: 0;
`;

function Aditor({id, defaultValue, onChange, onSelect}) {
    if (!id) {
        throw new Error('The id is required to use Aditor');
    }
    const editor = useRef(null);
    const toolbar = useRef(null);
    const [editorView, setEditorView] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState(null);

    PopoverManager.setPopoverAnchorElement = setAnchorEl;
    PopoverManager.setPopoverContent = setPopoverContent;
    PopoverManager.setAnchorEl(anchorEl);
    PopoverManager.setEditorView(editorView);

    const init = useCallback(() => {
        if (!editorView) {
            const _plugins = plugins(toolbar.current);
            const schema = new Schema({nodes, marks: marks(_plugins)});
            const doc = schema.nodeFromJSON({
                type: 'doc',
                content: normaliseValue(defaultValue)
            });
            const state = EditorState.create({
                doc,
                plugins: _plugins
            });
            const _editorView = new EditorView(editor.current, {
                state,
                nodeViews,
                dispatchTransaction(transaction) {
                    const newState = _editorView.state.apply(transaction);
                    _editorView.updateState(newState);

                    const data = newState.toJSON();
                    if (transaction.docChanged && onChange) {
                        onChange(data.doc.content);
                    }
                    if(onSelect){
                      onSelect(data.selection);
                    }
                }
            });
            setEditorView(_editorView);
        }
    }, [defaultValue, onChange, editorView]);

    useEffect(() => {
        init();
    }, [init]);

    return (
        <CssBaseline>
            <Paper>
                <Toolbar ref={toolbar} onMouseDown={(e) => e.preventDefault()}/>
                <Divider light/>
                <ProseMirrorStyle id={id} ref={editor}/>
                {editorView && (
                    <PopoverWithClickAway id={`popover_${id}`} anchorEl={anchorEl}>
                        {popoverContent}
                    </PopoverWithClickAway>
                )}
            </Paper>
        </CssBaseline>
    );
}

Aditor.defaultProps = {
    defaultValue: [],
    onChange: () => {
    },
    onSelect: () => {
    },
};

Aditor.propTypes = {
    id: PropTypes.string.isRequired,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
};

export default Aditor;
