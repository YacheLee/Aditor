import {DEFAULT_LAYOUT} from './config';

export function toDOM(node) {
    const {layout} = node.attrs;
    const attrs = {layout};
    return ['div', attrs, 0];
}

export const name = "mediaSingle";

export const node = {
    inline: false,
    group: 'block',
    selectable: false,
    atom: true,
    content: 'image',
    attrs: {
        layout: {default: DEFAULT_LAYOUT}
    },
    draggable: false,
    parseDOM: [
        {
            tag: 'div[layout]',
            getAttrs: dom => {
                return {
                    layout: dom.getAttribute('layout') || DEFAULT_LAYOUT
                };
            }
        }
    ],
    toDOM
};

export default node;
