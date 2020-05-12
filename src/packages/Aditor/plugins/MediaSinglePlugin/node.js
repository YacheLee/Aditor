import { DEFAULT_LAYOUT } from './config';

export function toDOM(node) {
  const { layout } = node.attrs;
  const attrs = { layout };
  return ['div', attrs, 0];
}

export const name = "mediaSingle";

export const node = {
  inline: false,
  group: 'block',
  selectable: true,
  atom: true,
  content: 'image',
  attrs: {
    layout: { default: DEFAULT_LAYOUT }
  },
  parseDOM: [
    {
      tag: 'div[layout]',
      getAttrs: dom => {
        console.log(dom);
        return {
          layout: dom.getAttribute('layout') || DEFAULT_LAYOUT
        };
      }
    }
  ],
  toDOM
};

export default node;
