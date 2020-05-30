import { Selection } from 'prosemirror-state';
import { Slice } from 'prosemirror-model';
import isValidTargetNode from './utils/isValidTargetNode';
import GapBookmark from './GapBookmark';
import Side from './Side';
import { JSON_ID } from './prosemirror/GapCursorPlugin';

class GapCursorSelection extends Selection{
  constructor($pos, side = Side.LEFT) {
    super($pos, $pos);
    this.side = side;
    this.visible = false;
  }

  static valid($pos) {
    const { parent, nodeBefore, nodeAfter } = $pos;

    const targetNode = isValidTargetNode(nodeBefore)
      ? nodeBefore
      : isValidTargetNode(nodeAfter)
        ? nodeAfter
        : null;

    if (!targetNode || parent.isTextblock) {
      return false;
    }

    const deflt = (parent.contentMatchAt($pos.index())).defaultType;
    return deflt && deflt.isTextblock;
  }

  static findFrom($pos, dir, mustMove = false,){
    const side = dir === 1 ? Side.RIGHT : Side.LEFT;

    if (!mustMove && GapCursorSelection.valid($pos)) {
      return new GapCursorSelection($pos, side);
    }

    let pos = $pos.pos;

    let next = null;

    // Scan up from this position
    for (let d = $pos.depth; ; d--) {
      const parent = $pos.node(d);

      if (
        side === Side.RIGHT
          ? $pos.indexAfter(d) < parent.childCount
          : $pos.index(d) > 0
      ) {
        next = parent.maybeChild(
          side === Side.RIGHT ? $pos.indexAfter(d) : $pos.index(d) - 1,
        );
        break;
      } else if (d === 0) {
        return null;
      }

      pos += dir;

      const $cur = $pos.doc.resolve(pos);
      if (GapCursorSelection.valid($cur)) {
        return new GapCursorSelection($cur, side);
      }
    }

    // And then down into the next node
    for (;;) {
      next = side === Side.RIGHT ? next.firstChild : next.lastChild;

      if (next === null) {
        break;
      }

      pos += dir;

      const $cur = $pos.doc.resolve(pos);
      if (GapCursorSelection.valid($cur)) {
        return new GapCursorSelection($cur, side);
      }
    }

    return null;
  }


  static fromJSON(doc, json,) {
    return new GapCursorSelection(doc.resolve(json.pos));
  }

  map(doc, mapping){
    const $pos = doc.resolve(mapping.map(this.head));
    return GapCursorSelection.valid($pos)
      ? new GapCursorSelection($pos, this.side)
      : Selection.near($pos);
  }

  eq(other){
    return other instanceof GapCursorSelection && other.head === this.head;
  }

  content() {
    return Slice.empty;
  }

  getBookmark() {
    return new GapBookmark(this.anchor);
  }

  toJSON() {
    return { pos: this.head, type: JSON_ID };
  }
}

Selection.jsonID(JSON_ID, GapCursorSelection);

export default GapCursorSelection;