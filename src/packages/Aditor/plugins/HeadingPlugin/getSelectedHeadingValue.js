import {PARAGRAPH_VALUE} from './config';

function getSelectedHeadingValue(headingNodes = []) {
    const set = new Set(headingNodes.map((node) => node.attrs.level));

    if (set.size === 1) {
        return set.values().next().value;
    } else {
        return PARAGRAPH_VALUE;
    }
}

export default getSelectedHeadingValue;
