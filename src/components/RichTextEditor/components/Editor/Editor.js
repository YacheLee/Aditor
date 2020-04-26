import React, {Fragment, useCallback, useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Schema} from 'prosemirror-model';
import {EditorState} from "prosemirror-state"
import {history, redo, undo} from "prosemirror-history";
import {keymap} from "prosemirror-keymap";
import {dropCursor} from "prosemirror-dropcursor"
import {gapCursor} from "prosemirror-gapcursor"
import {baseKeymap} from "prosemirror-commands";
import {EditorView} from "prosemirror-view"
import EditorViewContext from '../../contexts/EditorViewContext';
import './prosemirror.css';
import LinkPlugin from './plugins/LinkPlugin';
import Popover from '@material-ui/core/Popover';

export let setAnchorEl =  null;
export let setPopoverContent = null;

function Editor({value, onChange}) {
    const {editorView, setEditorView} = useContext(EditorViewContext);
    const [anchorEl, _setAnchorEl] = useState(null);
    const [popoverContent, _setPopoverContent] = useState(null);
    setAnchorEl = _setAnchorEl;
    setPopoverContent = _setPopoverContent;

    const editor = useRef(null);
    const id = 'editor_id';
    const open = Boolean(anchorEl);

    const init = useCallback(()=>{
        if(!editorView){
            const schema = new Schema({
                nodes: {
                    doc: {content: "block+"},
                    paragraph: {
                        group: "block",
                        content: "text*",
                        toDOM(node) { return ["p", 0] }
                    },
                    heading: {
                        attrs: {level: {default: 1}},
                        content: "inline*",
                        group: "block",
                        defining: true,
                        parseDOM: [
                            {tag: "h1", attrs: {level: 1}},
                            {tag: "h2", attrs: {level: 2}},
                            {tag: "h3", attrs: {level: 3}},
                            {tag: "h4", attrs: {level: 4}},
                            {tag: "h5", attrs: {level: 5}},
                            {tag: "h6", attrs: {level: 6}}
                        ],
                        toDOM(node) { return ["h" + node.attrs.level, 0] }
                    },
                    text: {
                        group: "inline",
                        inline: true,
                    },
                },
                marks: {
                    link: {
                        attrs: {
                            href: {},
                            title: {default: null}
                        },
                        inclusive: false,
                        parseDOM: [{tag: "a[href]", getAttrs(dom) {
                                return {href: dom.getAttribute("href"), title: dom.getAttribute("title")}
                        }}],
                        toDOM(node) {
                            const {href, title} = node.attrs;
                            return ["a", {href, title, class: "blockLink"}, 0];
                        }
                    },
                    strong: {
                        parseDOM: [{tag: "strong"}, {tag: "b"}],
                        toDOM: () => ['strong', 0]
                    },
                    em: {
                        parseDOM: [{tag: "i"}, {tag: "em"}, {style: "font-style=italic"}],
                        toDOM: () => ['em', 0]
                    },
                    u: {
                        parseDOM: [{tag: "u"}],
                        toDOM: () => ['u', 0]
                    },
                    del: {
                        parseDOM: [{tag: "del"}],
                        toDOM: () => ['del', 0]
                    },
                    textColor: {
                        attrs: { color: {} },
                        inclusive: true,
                        parseDOM: [
                            {
                                style: 'color',
                                getAttrs: (color) =>{
                                    return {color};
                                },
                            },
                        ],
                        toDOM: (mark) => {
                            return [
                                'span',
                                {
                                    style: "color: " + mark.attrs.color,
                                },
                            ];
                        }
                    }
                }
            });
            const editorState = EditorState.create({
                schema,
                doc: schema.nodeFromJSON({
                    type: "doc",
                    content: value
                }),
                plugins: [
                    history(),
                    keymap({'Mod-z': undo, 'Mod-y': redo}),
                    keymap(baseKeymap),
                    dropCursor(),
                    gapCursor(),
                    LinkPlugin
                ]
            })
            const editorView = new EditorView(editor.current, {
                state: editorState,
                autofocus: true,
                dispatchTransaction(transaction){
                    const newState = editorView.state.apply(transaction);
                    editorView.updateState(newState);
                    onChange(newState.toJSON().doc.content);
                }}
            )
            setEditorView(editorView);
        }
    }, [editorView, setEditorView, value, onChange]);

    useEffect(() => {
        init();
    }, [init]);

    return (
        <Fragment>
            <div style={{position: "relative"}} ref={editor} />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={()=>{
                    _setAnchorEl(null);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >{popoverContent}</Popover>
        </Fragment>
    );
}

Editor.defaultProps = {
    value: [],
    onChange: ()=>{}
};

Editor.propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func
};

export default Editor;
