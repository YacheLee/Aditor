import { Plugin, PluginKey } from 'prosemirror-state';
import { findPositionOfNodeBefore } from 'prosemirror-utils';
import { Decoration, DecorationSet } from 'prosemirror-view';
import Side from '../Side';
import setGapCursorAtPos from '../utils/setGapCursorAtPos';
import GapCursorSelection from '../gapCursorSelection';
import isIgnoredClick from '../utils/isIgnoredClick';
import getBreakoutModeFromTargetNode from '../utils/getBreakoutModeFromTargetNode';
import toDOM from '../utils/toDOM';

export const JSON_ID = 'gapcursor';
export const key = new PluginKey('GapCursorPlugin');

function MyPlugin() {
  return new Plugin({
    key,
    props: {
      decorations({ doc, selection }) {
        if (selection instanceof GapCursorSelection) {
          const { $from, side } = selection;

          // render decoration DOM node always to the left of the target node even if selection points to the right
          // otherwise positioning of the right gap cursor is a nightmare when the target node has a nodeView with vertical margins
          let position = selection.head;
          const isRightCursor = side === Side.RIGHT;
          if (isRightCursor && $from.nodeBefore) {
            const nodeBeforeStart = findPositionOfNodeBefore(selection);
            if (typeof nodeBeforeStart === 'number') {
              position = nodeBeforeStart;
            }
          }

          const node = isRightCursor ? $from.nodeBefore : $from.nodeAfter;
          const breakoutMode = node && getBreakoutModeFromTargetNode(node);
          return DecorationSet.create(doc, [
            Decoration.widget(position, toDOM, {
              key: `${JSON_ID}-${side}-${breakoutMode}`,
              side: breakoutMode ? -1 : 0,
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
        return;
      },

      handleClick(view, position, event){
        const posAtCoords = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });

        // this helps to ignore all of the clicks outside of the parent (e.g. nodeView controls)
        if (
          posAtCoords &&
          posAtCoords.inside !== position &&
          !isIgnoredClick(event.target)
        ) {
          // max available space between parent and child from the left side in px
          // this ensures the correct side of the gap cursor in case of clicking in between two block nodes
          const leftSideOffsetX = 20;
          const side = event.offsetX > leftSideOffsetX ? Side.RIGHT : Side.LEFT;
          return setGapCursorAtPos(position, side)(view.state, view.dispatch);
        }
        return false;
      }
    }
  });
}

export default MyPlugin;
