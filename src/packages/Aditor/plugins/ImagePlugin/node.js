export const name = 'image';

export const node = {
  group: 'inline',
    inline: true,
    attrs: {
    src: { default: '' },
    title: { default: null },
    width: { default: null },
    height: { default: null },
  },
  draggable: true,
    parseDOM: [
    {
      tag: 'img[src^="data:image/"]',
      ignore: true,
    }
  ],
    toDOM(node) {
    return ['img', node.attrs];
  }
}
