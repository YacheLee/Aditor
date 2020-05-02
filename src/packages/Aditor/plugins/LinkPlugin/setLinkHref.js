import filter from './filter';

function isTextAtPos(pos) {
    return function (state) {
        const node = state.doc.nodeAt(pos);
        return !!node && node.isText;
    };
}

function setLinkHref(href, pos, to) {
    return filter(isTextAtPos(pos), function (state, dispatch) {
        const $pos = state.doc.resolve(pos);
        const node = state.doc.nodeAt(pos);
        const linkMark = state.schema.marks.link;
        const mark = linkMark.isInSet(node.marks);
        const url = href;
        if (mark && mark.attrs.href === url) {
            return false;
        }
        const rightBound =
            to && pos !== to ? to : pos - $pos.textOffset + node.nodeSize;
        const tr = state.tr.removeMark(pos, rightBound, linkMark);
        if (href.trim()) {
            const linkMarkProps = { ...((mark && mark.attrs) || {}), href: url };
            tr.addMark(pos, rightBound, linkMark.create(linkMarkProps));
        }
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    });
}

export default setLinkHref;
