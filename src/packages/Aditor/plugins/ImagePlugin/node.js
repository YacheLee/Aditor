import { DEFAULT_LAYOUT } from './config';

export const name = 'image';

export const node = {
    group: 'block',
    attrs: {
        src: {default: ''},
        layout: {default: DEFAULT_LAYOUT},
        title: {default: null},
        width: {default: null},
        height: {default: null},
    },
    atom: true,
    selectable: false,
    draggable: false,
    parseDOM: [
        {
            tag: 'img[src^="data:image/"]',
            ignore: true,
        }
    ],
    toDOM(node) {
        return ['div', 0];
    }
}
