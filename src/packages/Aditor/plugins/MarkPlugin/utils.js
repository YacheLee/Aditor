function markActive(state, mark) {
    const {selection} = state;
    const {from, $from, to, empty} = selection;
    if (empty) {
        return mark.isInSet(state.storedMarks || $from.marks());
    } else {
        return state.doc.rangeHasMark(from, to, mark);
    }
}

export function isActive(editorState, mark) {
    return !!markActive(editorState, mark);
}
