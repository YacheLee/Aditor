import Side from '../Side';
import GapCursorSelection from '../gapCursorSelection';

function setGapCursorAtPos(position, side=Side.LEFT){
  return (state, dispatch) => {
    if (position > state.doc.content.size) {
      return false;
    }
    const $pos = state.doc.resolve(position);

    if (GapCursorSelection.valid($pos)) {
      if (dispatch) {
        dispatch(state.tr.setSelection(new GapCursorSelection($pos, side)));
      }
      return true;
    }

    return false;
  };
}

export default setGapCursorAtPos;