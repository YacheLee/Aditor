import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import styles from './HighlightPlugin.module.css';

const key = new PluginKey('HighlightPlugin');
const DECORATION_ID = 'HighlightDecoration_id';

function getDecoration(from, to) {
  return Decoration.inline(
    from,
    to,
    { class: styles.highlight },
    { id: DECORATION_ID }
  );
}

function MyPlugin() {
  return new Plugin({
    key,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        const data = tr.getMeta(key);

        if (!data) return set;

        const { selection, doc, mapping } = tr;
        set = set.map(mapping, doc);

        if (data.type === 'open') {
          set = set.add(doc, [getDecoration(selection.from, selection.to)]);
        } else if (data.type === 'close') {
          const highlightDecoration = set.find(
            null,
            null,
            (e) => e.id === DECORATION_ID
          );
          set = set.remove(highlightDecoration);
        }

        return set;
      }
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
      handleDOMEvents: {
        blur: function (editorView) {
          editorView.dispatch(
            editorView.state.tr.setMeta(key, { type: 'open' })
          );
          return false;
        },
        focus: function (editorView) {
          editorView.dispatch(
            editorView.state.tr.setMeta(key, { type: 'close' })
          );
          return false;
        }
      }
    }
  });
}

export default MyPlugin;
