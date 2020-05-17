export const name = 'media';

export const node = {
  selectable: true,
  attrs: {
    src: {default: ''},
    title: {default: null},
    width: {default: null},
    height: {default: null},
  },
  toDOM(node) {
    return ['div', node.attrs];
  }
}