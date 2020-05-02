import filter from './filter';

function isLinkAtPos(pos){
    return (state) => {
        const node = state.doc.nodeAt(pos);
        return !!node && state.schema.marks.link.isInSet(node.marks);
    };
}

function setLinkText(text, pos, to){
    return filter(isLinkAtPos(pos), (state, dispatch) => {
        const $pos = state.doc.resolve(pos);
        const node = state.doc.nodeAt(pos);
        const mark = state.schema.marks.link.isInSet(node.marks);
        if (node && text.length > 0 && text !== node.text) {
            const rightBound = to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
            const {tr} = state;

            tr.insertText(text, pos, rightBound);
            tr.addMark(pos, pos + text.length, mark);

            if (dispatch) {
                dispatch(tr);
            }
            return true;
        }
        return false;
    });
}

export default setLinkText;
