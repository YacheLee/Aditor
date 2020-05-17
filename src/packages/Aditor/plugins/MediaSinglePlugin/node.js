import { DEFAULT_LAYOUT } from './index';

export const name = 'mediaSingle';

export const LAYOUT_LEFT = 'left';
export const LAYOUT_CENTER = 'center';
export const LAYOUT_RIGHT = 'right';
export const LAYOUT_WRAP_LEFT = 'wrap-left';
export const LAYOUT_WRAP_RIGHT = 'wrap-right';

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
