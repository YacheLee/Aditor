import {DEFAULT_LAYOUT} from '../index';

export const name = 'mediaSingle';

export const node = {
    inline: false,
    group: 'block',
    selectable: true,
    atom: true,
    content: 'media',
    attrs: {
        layout: {default: DEFAULT_LAYOUT},
    },
    toDOM(node) {
        return ['div', node.attrs, 0];
    }
}
