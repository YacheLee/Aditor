const nodes = {
  doc: {
    content: 'block+'
  },
  paragraph: {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM: function toDOM() {
      return ['p', 0];
    }
  },
  mediaSingle: {
    inline: false,
    group: 'block',
    selectable: true,
    atom: true,
    content: 'image',
    attrs: {
      layout: { default: 'left' },
    },
    parseDOM: [
      {
        tag: 'div[layout]',
        getAttrs: dom => {
          console.log(dom);
          return {
            layout: dom.getAttribute('layout') || 'left'
          };
        }
      },
    ],
    toDOM(node) {
      const { layout } = node.attrs;
      const attrs = {
        layout,
      };
      return ['div', attrs, 0];
    }
  },
  image: {
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
    },
  },
  heading: {
    attrs: { level: { default: 1 } },
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: [
      { tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 4 } },
      { tag: 'h5', attrs: { level: 5 } },
      { tag: 'h6', attrs: { level: 6 } }
    ],
    toDOM(node) {
      return ['h' + node.attrs.level, 0];
    }
  },
  text: {
    group: 'inline',
    inline: true
  },
};

export default nodes;
