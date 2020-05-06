import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import styles from './HighlightPlugin.module.css';

const DECORATION_ID = "HighlightDecoration_id";

function getDecorations(from, to) {
  return [ Decoration.inline(from, to, { class: styles.highlight }, {id: DECORATION_ID}) ];
}

function MyPlugin() {
  return new Plugin({
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        const { selection, doc } = tr;
        const { from, to } = selection;

        set = set.map(tr.mapping, doc);
        if (from !== to) {
          set = set.add(tr.doc, getDecorations(from, to));
        } else {
          const highlightDecoration = set.find(null, null, e=> e.id=== DECORATION_ID);
          set = set.remove(highlightDecoration);
        }
        return set;
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
