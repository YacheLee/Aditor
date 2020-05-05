import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import styles from './CursorPlugin.module.css';

const pluginKey = new PluginKey('CursorPlugin');
const ZeroWidthSpace = '\u200b';

function getOpenState(doc, position) {
  const span = document.createElement('span');
  span.textContent = ZeroWidthSpace;
  span.className = styles.cursor;

  const decorations = [
    Decoration.widget(position, span, {
      key: `cursor`
    })
  ];
  return DecorationSet.create(doc, decorations);
}

function getCloseState(doc) {
  const decorations = [];
  return DecorationSet.create(doc, decorations);
}

function MyPlugin() {
  return new Plugin({
    key: pluginKey,
    state: {
      init(_, { doc }) {},
      apply(tr, oldState) {
        const data = tr.getMeta(pluginKey);

        if (data) {
          const { selection, doc } = tr;
          const { from, to } = selection;

          if (data.type === 'open') {
            if (from === to) {
              return getOpenState(doc, tr.selection.head);
            }
          } else if (data.type === 'close') {
            return getCloseState(doc);
          }
        }
        return oldState;
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
          return true;
        },
        focus: function (editorView) {
          editorView.dispatch(
            editorView.state.tr.setMeta(pluginKey, { type: 'close' })
          );
          return true;
        }
      }
    }
  });
}

export default MyPlugin;
