function isSelectionInsideLink(state) {
    return !!state.doc.type.schema.marks.link.isInSet(
        state.selection.$from.marks()
    );
}

function isSelectionAroundLink(state) {
    const { selection } = state;
    const { $from, $to } = selection;
    const node = $from.nodeAfter;
    return (
        !!node &&
        $from.textOffset === 0 &&
        $to.pos - $from.pos === node.nodeSize &&
        !!state.doc.type.schema.marks.link.isInSet(node.marks)
    );
}

function getActiveLinkMark(state) {
    const {$from} = state.selection;
    if (isSelectionInsideLink(state) || isSelectionAroundLink(state)) {
        const pos = $from.pos - $from.textOffset;
        const node = state.doc.nodeAt(pos);
        return node && node.isText ? { node, pos } : undefined;
    }
    return undefined;
}

export default getActiveLinkMark;
