import Side from '../Side';
import cumulativeOffset from './cumulativeOffset';

function isLeftCursor(side){
  return side === Side.LEFT;
}

function toDOM(view, getPos){
  const selection = view.state.selection;
  const { side } = selection;
  const nodeStart = getPos();
  const dom = view.nodeDOM(nodeStart);

  const gapCursorElement = document.createElement('span');
  gapCursorElement.className = 'ProseMirror-gapcursor';

  if (dom instanceof HTMLElement) {
    const isMediaSingleView = dom.classList.contains('mediaSingleView-content-wrap');
    if(isMediaSingleView){
      const mediaSingleDom = dom.querySelector('.media-single');

      const {width, height} = mediaSingleDom.getBoundingClientRect();
      const {left} = cumulativeOffset(mediaSingleDom);

      gapCursorElement.style.width = `${width}px`;
      gapCursorElement.style.height = `${height}px`;

      if(isLeftCursor(side)){
        gapCursorElement.style.left = `${left-3}px`;
        gapCursorElement.style.borderLeft = `solid 1px`;
      }

      else{
        gapCursorElement.style.left = `${left+3}px`;
        gapCursorElement.style.borderRight = `solid 1px`;
      }
    }
  }
  return gapCursorElement;
}

export default toDOM;