import { NodeSelection, TextSelection } from 'prosemirror-state';
import Direction, { isBackward, isForward } from './Direction';
import GapCursorSelection from '../GapCursorPlugin/gapCursorSelection';
import shouldHandleMediaGapCursor from './shouldHandleMediaGapCursor';
import { findDomRefAtPos } from 'prosemirror-utils';
import isValidTargetNode from '../GapCursorPlugin/utils/isValidTargetNode';
import Side from '../GapCursorPlugin/Side';
import atTheBeginningOfDoc from './utils/atTheBeginningOfDoc';
import isTextBlockNearPos from './utils/isTextBlockNearPos';
import atTheEndOfDoc from './utils/atTheEndOfDoc';

const ZeroWidthSpace = '\u200b';

function arrow (dir, endOfTextBlock){
  return (state, dispatch, editorView) => {
    const { doc, schema, selection, tr } = state;

    let $pos = isBackward(dir) ? selection.$from : selection.$to;
    let mustMove = selection.empty;

    // start from text selection
    if (selection instanceof TextSelection) {
      // if cursor is in the middle of a text node, do nothing
      if (!endOfTextBlock || !endOfTextBlock(dir.toString())) {
        return false;
      }

      // UP/DOWN jumps to the nearest texblock skipping gapcursor whenever possible
      if (
        (dir === Direction.UP &&
          !atTheBeginningOfDoc(state) &&
          isTextBlockNearPos(doc, schema, $pos, -1)) ||
        (dir === Direction.DOWN &&
          (atTheEndOfDoc(state) || isTextBlockNearPos(doc, schema, $pos, 1)))
      ) {
        return false;
      }
      // otherwise resolve previous/next position
      $pos = doc.resolve(isBackward(dir) ? $pos.before() : $pos.after());
      mustMove = false;
    }

    if (selection instanceof NodeSelection) {
      if (dir === Direction.UP || dir === Direction.DOWN) {
        // We dont add gap cursor on node selections going up and down
        return false;
      }
    }

    if (!shouldHandleMediaGapCursor(dir, state)) {
      return false;
    }

    // when jumping between block nodes at the same depth, we need to reverse cursor without changing ProseMirror position
    if (
      selection instanceof GapCursorSelection &&
      // next node allow gap cursor position
      isValidTargetNode(isBackward(dir) ? $pos.nodeBefore : $pos.nodeAfter) &&
      // gap cursor changes block node
      ((isBackward(dir) && selection.side === Side.LEFT) ||
        (isForward(dir) && selection.side === Side.RIGHT))
    ) {
      // reverse cursor position
      if (dispatch) {
        dispatch(
          tr
            .setSelection(
              new GapCursorSelection(
                $pos,
                selection.side === Side.RIGHT ? Side.LEFT : Side.RIGHT,
              ),
            )
            .scrollIntoView(),
        );
      }
      return true;
    }

    if (editorView) {
      const domAtPos = editorView.domAtPos.bind(editorView);
      const target = findDomRefAtPos($pos.pos, domAtPos);

      if (target && target.textContent === ZeroWidthSpace) {
        return false;
      }
    }

    const nextSelection = GapCursorSelection.findFrom(
      $pos,
      isBackward(dir) ? -1 : 1,
      mustMove,
    );

    if (!nextSelection) {
      return false;
    }

    if (
      !isValidTargetNode(
        isForward(dir)
          ? nextSelection.$from.nodeBefore
          : nextSelection.$from.nodeAfter,
      )
    ) {
      // reverse cursor position
      if (dispatch) {
        dispatch(
          tr
            .setSelection(
              new GapCursorSelection(
                nextSelection.$from,
                isForward(dir) ? Side.LEFT : Side.RIGHT,
              ),
            )
            .scrollIntoView(),
        );
      }
      return true;
    }

    if (dispatch) {
      dispatch(tr.setSelection(nextSelection).scrollIntoView());
    }
    return true;
  };
}

export default arrow;