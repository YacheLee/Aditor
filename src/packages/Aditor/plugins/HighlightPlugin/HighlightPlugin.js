import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import styles from './HighlightPlugin.module.css';

function getState(doc, from, to) {
  const decorations = [
    Decoration.inline(from, to, { class: styles.highlight })
  ];
  return DecorationSet.create(doc, decorations);
}

class View {
  constructor(editorView) {
    this.editorView = editorView;
    editorView.dom.classList.add(styles.editorView);
  }
}

function MyPlugin() {
  return new Plugin({
    view(editorView) {
      return new View(editorView);
    },
    state: {
      init(_, { doc }) {
        return getState(doc);
      },
      apply(tr) {
        const { selection, doc } = tr;
        const { from, to } = selection;
        if (from !== to) {
          return getState(doc, from, to);
        } else {
          return getState(doc, 0, 0);
        }
      }
    },
    props: {
      decorations(state) {
        return this.getState(state);
      }
    }
  });
}

export default MyPlugin;
