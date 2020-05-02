import filter from '../../filter';

function canLinkBeCreatedInRange(from, to){
    return (state)=>{
        if (!state.doc.rangeHasMark(from, to, state.schema.marks.link)) {
            const $from = state.doc.resolve(from);
            const $to = state.doc.resolve(to);
            const link = state.schema.marks.link;
            if ($from.parent === $to.parent && $from.parent.isTextblock) {
                if ($from.parent.type.allowsMarkType(link)) {
                    let allowed = true;
                    state.doc.nodesBetween(from, to, node => {
                        allowed = allowed && !node.marks.some(m => m.type.excludes(link));
                        return allowed;
                    });
                    return allowed;
                }
            }
        }
        return false;
    }
}

function insertLink( from, href, text){
    return filter(canLinkBeCreatedInRange(from, from), (state, dispatch) => {
        const link = state.schema.marks.link;
        if (href.trim()) {
            const { tr } = state;
            const textContent = text || href;
            tr.insertText(textContent, from, from);
            tr.addMark( from, from + textContent.length, link.create({ href }));

            if (dispatch) {
                dispatch(tr.scrollIntoView());
            }
            return true;
        }
        return false;
    });
}

export default insertLink;
