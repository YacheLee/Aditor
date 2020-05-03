import styles from './LinkPlugin.module.css';

const mark = {
  link: {
    attrs: {
      href: {},
      title: { default: null }
    },
    inclusive: false,
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs(dom) {
          return {
            href: dom.getAttribute('href'),
            title: dom.getAttribute('title')
          };
        }
      }
    ],
    toDOM(node) {
      const { href, title } = node.attrs;
      return ['a', { href, title, class: styles.blockLink }, 0];
    }
  }
};

export default mark;
