import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import styles from './CursorPlugin.module.css';

const pluginKey = new PluginKey('CursorPlugin');
const DECORATION_ID = 'CursorDecoration_id';
const ZeroWidthSpace = '\u200b';

function getCursorDecoration(doc, position) {
  const span = document.createElement('span');
  span.textContent = ZeroWidthSpace;
  span.className = styles.cursor;

  return Decoration.widget(position, span, {
    id: DECORATION_ID
  });
}

function getNodeSpellCheckDecoration(doc, position) {
  let decoration;
  doc.nodesBetween(position, position, function (node, pos) {
    if (node.isBlock) {
      const attribute = {
        'data-gramm': false,
        spellcheck: false
      };
      decoration = Decoration.node(pos, pos + node.nodeSize, attribute, {
        id: DECORATION_ID
      });
    }
  });
  return decoration;
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
            set = set.add(doc, [
              getCursorDecoration(doc, selection.head),
              getNodeSpellCheckDecoration(doc, selection.head)
            ]);
          }
        } else if (data.type === 'close') {
          const decorations = set.find(null, null, (e) => {
            return e.id === DECORATION_ID;
          });
          set = set.remove(decorations);
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
