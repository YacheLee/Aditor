import { NodeSelection, TextSelection } from 'prosemirror-state';
import Direction, { isBackward } from './Direction';
import getMediaNearPos from './getMediaNearPos';

const mapDirection = {
  [Direction.LEFT]: -1,
  [Direction.RIGHT]: 1,
  [Direction.UP]: -1,
  [Direction.DOWN]: 1,
  [Direction.BACKWARD]: -1,
  [Direction.FORWARD]: 1,
};

function atTheEndOfDoc(state){
  const { selection, doc } = state;
  return doc.nodeSize - selection.$to.pos - 2 === selection.$to.depth;
}

function atTheBeginningOfDoc(state){
  const { selection } = state;
  return selection.$from.pos === selection.$from.depth;
}

function shouldHandleMediaGapCursor(dir, state,){
  const { doc, schema, selection } = state;
  let $pos = isBackward(dir) ? selection.$from : selection.$to;

  if (selection instanceof TextSelection) {
    // Should not use gap cursor if I am moving from a text selection into a media node
    if (
      (dir === Direction.UP && !atTheBeginningOfDoc(state)) ||
      (dir === Direction.DOWN && !atTheEndOfDoc(state))
    ) {
      const media = getMediaNearPos(doc, $pos, schema, mapDirection[dir]);
      if (media) {
        return false;
      }
    }

    // Should not use gap cursor if I am moving from a text selection into a media node with layout wrap-right or wrap-left
    if (dir === Direction.LEFT || dir === Direction.RIGHT) {
      const media = getMediaNearPos(doc, $pos, schema, mapDirection[dir]);
      if (
        media &&
        media.type.name === "mediaSingle" &&
        (
          media.attrs.layout === 'left' ||
          media.attrs.layout === 'center' ||
          media.attrs.layout === 'right'
        )
      ) {
        return false;
      }
    }
  }

  if (selection instanceof NodeSelection) {
    // Should not use gap cursor if I am moving left/right from media node with layout wrap right or wrap-left
    if (dir === Direction.LEFT || dir === Direction.RIGHT) {
      const maybeMedia = doc.nodeAt(selection.$from.pos);

      if (
        maybeMedia &&
        maybeMedia.type.name === 'mediaSingle' &&
        (maybeMedia.attrs.layout === 'right' ||
          maybeMedia.attrs.layout === 'center' ||
          maybeMedia.attrs.layout === 'left')
      ) {
        return false;
      }
    }
  }
  return true;
}

export default shouldHandleMediaGapCursor;