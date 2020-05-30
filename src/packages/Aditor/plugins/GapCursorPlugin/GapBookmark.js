import GapCursorSelection from './gapCursorSelection';

class GapBookmark {
  constructor(pos) {
    this.pos = pos;
  }

  map(mapping) {
    return new GapBookmark(mapping.map(this.pos));
  }
  resolve(doc){
  const $pos = doc.resolve(this.pos);
    return GapCursorSelection.valid($pos)
      ? new GapCursorSelection($pos)
      : Selection.near($pos);
  }
}


export default GapBookmark;