import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import styles from './CursorPlugin.module.css';

const pluginKey = new PluginKey('CursorPlugin');
const DECORATION_ID = 'CursorDecoration_id';
const ZeroWidthSpace = '\u200b';

function getDecoration(doc, position) {
  const span = document.createElement('span');
  span.textContent = ZeroWidthSpace;
  span.className = styles.cursor;

  return Decoration.widget(position, span, {
    key: `cursor`,
    id: DECORATION_ID
  });
}

function MyPlugin() {
  return new Plugin({
    key: pluginKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        const data = tr.getMeta(pluginKey);

        if (!data) return set;

        const { selection, doc, mapping } = tr;
        const { from, to } = selection;
        set = set.map(mapping, doc);

        if (data.type === 'open') {
          if (from === to) {
            set = set.add(doc, [getDecoration(doc, selection.head)]);
          }
        } else if (data.type === 'close') {
          const decoration = set.find(null, null, (e) => {
            return e.id === DECORATION_ID;
          });
          set = set.remove(decoration);
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
            editorView.state.tr.setMeta(pluginKey, { type: 'open' })
          );
          return false;
        },
        focus: function (editorView) {
          editorView.dispatch(
            editorView.state.tr.setMeta(pluginKey, { type: 'close' })
          );
          return false;
        }
      }
    }
  });
}

export default MyPlugin;
