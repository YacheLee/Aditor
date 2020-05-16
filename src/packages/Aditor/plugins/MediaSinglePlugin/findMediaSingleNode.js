//source is referred from https://github.com/atlassian/prosemirror-utils/blob/master/src/selection.js#L21

function findMediaSingleNode(editorView, pos){
    const $pos = editorView.state.doc.resolve(pos);
    const predicate = node => {
        return node.type.name === 'mediaSingle'
    };
    for (let i = $pos.depth; i > 0; i--) {
        const node = $pos.node(i);
        if (predicate(node)) {
            return {
                pos: i > 0 ? $pos.before(i) : 0,
                node
            };
        }
    }
}

export default findMediaSingleNode;
