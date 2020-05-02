import getSelectedHeadingValue from './getSelectedHeadingValue';
import {PARAGRAPH_VALUE} from './config';

function getHeading(editorView) {
    const { selection, tr } = editorView.state;
    const { from, to } = selection;
    const blockNodes = [];
    const headingNodes = [];
    tr.doc.nodesBetween(tr.mapping.map(from), tr.mapping.map(to), (node) => {
        if (node.isBlock) {
            blockNodes.push(node);
            if (node.type.name === 'heading') {
                headingNodes.push(node);
            }
        }
    });

    if (blockNodes.length === headingNodes.length) {
        return getSelectedHeadingValue(headingNodes);
    } else {
        return PARAGRAPH_VALUE;
    }
}

export default getHeading;
