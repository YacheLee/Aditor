import { Plugin, PluginKey } from 'prosemirror-state';
import { findPositionOfNodeBefore } from 'prosemirror-utils';
import { Decoration, DecorationSet } from 'prosemirror-view';
import Side from '../Side';
import setGapCursorAtPos from '../utils/setGapCursorAtPos';
import GapCursorSelection from '../gapCursorSelection';
import fixCursorAlignment from '../utils/fixCursorAlignment';

export const JSON_ID = 'gapcursor';
export const key = new PluginKey('GapCursorPlugin');

function MyPlugin() {
  return new Plugin({
    key,
    view(){
      return {
        update(editorView) {
          if (
            editorView.state.selection instanceof GapCursorSelection &&
            editorView.hasFocus()
          ) {
            fixCursorAlignment(editorView);
          }
        },
      };
    },
    props: {
      decorations({ doc, selection }) {
        if (selection instanceof GapCursorSelection) {
          const { $from, side } = selection;
          const node = document.createElement('span');
          node.className = `ProseMirror-gapcursor ${
            side === Side.LEFT ? '-left' : '-right'
          }`;
          node.appendChild(document.createElement('span'));

          // render decoration DOM node always to the left of the target node even if selection points to the right
          // otherwise positioning of the right gap cursor is a nightmare when the target node has a nodeView with vertical margins
          let position = selection.head;
          if (side === Side.RIGHT && $from.nodeBefore) {
            const nodeBeforeStart = findPositionOfNodeBefore(selection);
            if (typeof nodeBeforeStart === 'number') {
              position = nodeBeforeStart;
            }
          }

          return DecorationSet.create(doc, [
            Decoration.widget(position, node, {
              key: `${JSON_ID}-${side}`,
              side: -1,
            }),
          ]);
        }

        return null;
      },

      // render gap cursor only when its valid
      createSelectionBetween(view, $anchor, $head,) {
        if ($anchor.pos === $head.pos && GapCursorSelection.valid($head)) {
          return new GapCursorSelection($head);
        }
      },

      handleClick(editorView, position, event){
        const posAtCoords = editorView.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });

        if (posAtCoords && posAtCoords.inside !== position) {
          const leftSideOffsetX = 20;
          const side = event.offsetX > leftSideOffsetX ? Side.RIGHT : Side.LEFT;
          return setGapCursorAtPos(position, side)(editorView.state, editorView.dispatch);
        }
        return false;
      }
    }
  });
}

export default MyPlugin;
