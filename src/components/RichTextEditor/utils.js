import {setBlockType, toggleMark} from 'prosemirror-commands';
import {Selection, TextSelection} from 'prosemirror-state';
import {HEADING_DEFAULT_TYPE} from './components/Toolbar/HeadingButton/types';

export function isValue(editorView, type_name){
    return !!markActive(editorView.state, getType(editorView, type_name));
}

export function markActive(state, type) {
    const ref = state.selection;
    const from = ref.from;
    const $from = ref.$from;
    const to = ref.to;
    const empty = ref.empty;
    if (empty) { return type.isInSet(state.storedMarks || $from.marks()) }
    else { return state.doc.rangeHasMark(from, to, type) }
}

export function toggleType(e, editorView, type_name){
    e.preventDefault();
    editorView.focus()
    const type = getType(editorView, type_name);
    const command = toggleMark(type);
    command(editorView.state, editorView.dispatch, editorView);
}

export function getSelectedHeadingValue(headingNodes=[]){
    const set = new Set(headingNodes.map(node => node.attrs.level));

    if(set.size===1){
        return set.values().next().value;
    }
    else{
        return HEADING_DEFAULT_TYPE;
    }
}

export function getHeading(editorView){
    const {selection, tr} = editorView.state;
    const {from, to} = selection;
    const blockNodes = [];
    const headingNodes = [];
    tr.doc.nodesBetween(tr.mapping.map(from), tr.mapping.map(to), function (node) {
        if(node.isBlock){
            blockNodes.push(node);
            if(node.type.name==='heading'){
                headingNodes.push(node);
            }
        }
    });
    //if all the selected nodes are heading
    if(blockNodes.length === headingNodes.length){
        return getSelectedHeadingValue(headingNodes);
    }
    else{
        return HEADING_DEFAULT_TYPE;
    }
}

export function changeHeading(editorView, level){
    editorView.focus();
    const schema = getSchema(editorView);

    let command;
    if(level===HEADING_DEFAULT_TYPE){
        command = setBlockType(schema.nodes.paragraph);
    }
    else{
        command = setBlockType(schema.nodes.heading, {level});
    }
    command(editorView.state, editorView.dispatch);
}

export function getSchema(editorView){
    return editorView.state.schema;
}

export function getMarks(editorView){
    return getSchema(editorView).marks;
}

export function getType(editorView, name=""){
    return getMarks(editorView)[name];
}

export function getTopLevelNode(editorView){
    return editorView.state.selection.$from.node(1);
}

export function getColor(editorView) {
    const state = editorView.state;
    let {$from, $to, $cursor} = state.selection;
    const textColor = state.schema.marks.textColor;
    let marks = [];
    if ($cursor) {
        marks.push(textColor.isInSet(state.storedMarks || $cursor.marks()) || undefined);
    }
    else {
        state.doc.nodesBetween($from.pos, $to.pos, function (currentNode) {
            if (currentNode.isLeaf) {
                let mark = textColor.isInSet(currentNode.marks) || undefined;
                marks.push(mark);
                return !mark;
            }
            return true;
        });
    }
    let prevMark;
    marks = marks.filter(function (mark) {
        if (mark && prevMark && mark.attrs.color === prevMark.attrs.color) {
            return false;
        }
        prevMark = mark;
        return true;
    });
    const marksWithColor = marks.filter(function (mark) { return !!mark; });
    if (marksWithColor.length > 1 ||
        (marksWithColor.length === 1 && marks.length > 1)) {
        return null;
    }
    return marksWithColor.length
        ? marksWithColor[0].attrs.color
        : "black";
}

function removeColor(){ return (state, dispatch) =>{
    let {schema, selection, tr} = state;
    const textColor = schema.marks.textColor;
    const {from, to, $cursor} = selection;
    if ($cursor) {
        tr = state.tr.removeStoredMark(textColor);
    }
    else {
        tr = state.tr.removeMark(from, to, textColor);
    }
    dispatch(tr.scrollIntoView());
    return true;
};}

export function toggleColor(editorView, color){
    const type = getType(editorView, 'textColor');
    const command = toggleMark(type, {color});
    command(editorView.state, editorView.dispatch, editorView);
}

export function changeColor(editorView, color, state, dispatch) {
    removeColor()(state, dispatch);
    toggleColor(editorView, color);
}

export function insertLink(from, to, href, text) {
    return function (state, dispatch) {
        const {link} = state.schema.marks;
        if (href.trim()) {
            const {tr} = state;
            const textContent = text || href;
            tr.insertText(textContent, from, to);
            tr.addMark(from, from + textContent.length, link.create({ href }));
            tr.setSelection(Selection.near(tr.doc.resolve(from + textContent.length)));
            if (dispatch) {
                dispatch(tr);
            }
            return true;
        }
        return false;
    };
}

export function getActiveText(selection) {
    if(!selection) return;

    const currentSlice = selection.content();
    if (currentSlice.size === 0) {
        return;
    }
    else if (currentSlice.content.childCount === 1 &&
        currentSlice.content.firstChild && selection instanceof TextSelection) {
        return currentSlice.content.firstChild.textContent;
    }
    return;
}

export function canLinkBeCreatedInRange(from, to) { return function (state) {
    if (!state.doc.rangeHasMark(from, to, state.schema.marks.link)) {
        var $from = state.doc.resolve(from);
        var $to = state.doc.resolve(to);
        var link_1 = state.schema.marks.link;
        if ($from.parent === $to.parent && $from.parent.isTextblock) {
            if ($from.parent.type.allowsMarkType(link_1)) {
                var allowed_1 = true;
                state.doc.nodesBetween(from, to, function (node) {
                    allowed_1 = allowed_1 && !node.marks.some(function (m) { return m.type.excludes(link_1); });
                    return allowed_1;
                });
                return allowed_1;
            }
        }
    }
    return false;
};}

export function closestElement(node, s) {
    var el = node;
    if (!el) {
        return null;
    }
    if (!document.documentElement || !document.documentElement.contains(el)) {
        return null;
    }
    if (el.closest) {
        return el.closest(s);
    }
    var matches = el.matches ? 'matches' : 'msMatchesSelector';
    do {
        if (el[matches] && el[matches](s)) {
            return el;
        }
        el = (el.parentElement || el.parentNode);
    } while (el !== null && el.nodeType === 1);
    return null;
}

export function isSelectionInsideLink(state) {
    return !!state.doc.type.schema.marks.link.isInSet(state.selection.$from.marks());
}

function isSelectionAroundLink(state) {
    const {selection} = state;
    const {$from, $to} = selection;
    const node = $from.nodeAfter;
    return (!!node &&
        $from.textOffset === 0 &&
        $to.pos - $from.pos === node.nodeSize &&
        !!state.doc.type.schema.marks.link.isInSet(node.marks));
}

export function getActiveLinkMark(state) {
    const $from = state.selection.$from;
    if (isSelectionInsideLink(state) || isSelectionAroundLink(state)) {
        const pos = $from.pos - $from.textOffset;
        const node = state.doc.nodeAt(pos);
        return node && node.isText ? { node, pos } : undefined;
    }
    return undefined;
}

function isTextAtPos(pos) {
    return function (state) {
        var node = state.doc.nodeAt(pos);
        return !!node && node.isText;
    };
}

function filter(predicates, cmd){
    return function (state, dispatch, view) {
        if (!Array.isArray(predicates)) {
            predicates = [predicates];
        }
        if (predicates.some(function (pred) { return !pred(state, view); })) {
            return false;
        }
        return cmd(state, dispatch, view) || false;
    };
}

export function setLinkHref(href, pos, to) {
    return filter(isTextAtPos(pos), function (state, dispatch) {
        const $pos = state.doc.resolve(pos);
        const node = state.doc.nodeAt(pos);
        const linkMark = state.schema.marks.link;
        const mark = linkMark.isInSet(node.marks);
        const url = href;
        if (mark && mark.attrs.href === url) {
            return false;
        }
        const rightBound = to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
        const tr = state.tr.removeMark(pos, rightBound, linkMark);
        if (href.trim()) {
            const linkMarkProps = {...(mark && mark.attrs) || {}, href: url}
            tr.addMark(pos, rightBound, linkMark.create(linkMarkProps));
        }
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    });
}

export function removeLink(pos) {
    return setLinkHref('', pos);
}
