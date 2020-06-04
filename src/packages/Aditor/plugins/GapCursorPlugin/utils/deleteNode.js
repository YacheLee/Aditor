import { removeNodeBefore } from 'prosemirror-utils';
import { Selection } from 'prosemirror-state';
import { isBackward } from '../Direction';
import GapCursorSelection from '../gapCursorSelection';
import Side from '../Side';

function deleteNode(dir){
  return (state, dispatch) => {
    if (state.selection instanceof GapCursorSelection) {
      const { $from, $anchor } = state.selection;
      let { tr } = state;
      debugger;
      if (isBackward(dir)) {
        if (state.selection.side === 'left') {
          tr.setSelection(new GapCursorSelection($anchor, Side.RIGHT));
          if (dispatch) {
            dispatch(tr);
          }
          return true;
        }
        tr = removeNodeBefore(state.tr);
      } else if ($from.nodeAfter) {
        tr = tr.delete($from.pos, $from.pos + $from.nodeAfter.nodeSize);
      }
      if (dispatch) {
        dispatch(tr.setSelection(Selection.near(tr.doc.resolve(tr.mapping.map(state.selection.$from.pos)))).scrollIntoView());
      }
      return true;
    }
    return false;
  };
}

export default deleteNode;