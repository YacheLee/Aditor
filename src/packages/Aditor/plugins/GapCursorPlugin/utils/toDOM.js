import Side from '../Side';

function isLeftCursor(side){
  return side === Side.LEFT;
}

function measureValue(style, measureValues){
  const [base, ...contentBoxValues] = measureValues;
  const measures = [style.getPropertyValue(base)];

  const boxSizing = style.getPropertyValue('box-sizing');
  if (boxSizing === 'content-box') {
    contentBoxValues.forEach(value => {
      measures.push(style.getPropertyValue(value));
    });
  }

  let result = 0;
  for (let i = 0; i < measures.length; i++) {
    result += parseFloat(measures[i]);
  }
  return result;
}

function measureWidth(style){
  return measureValue(style, [
    'width',
    'padding-left',
    'padding-right',
    'border-left-width',
    'border-right-width',
  ]);
}

function measureHeight(style){
  return measureValue(style, [
    'height',
    'padding-top',
    'padding-bottom',
    'border-top-width',
    'border-bottom-width',
  ]);
}

function mutateElementStyle(gapCursorElem, dom, style, side){
  if (isLeftCursor(side)) {
    const {left} = dom.getBoundingClientRect();
    gapCursorElem.style.left = left+"px";
  } else {
    // const marginRight = parseFloat(style.getPropertyValue('margin-right'));
    // if (marginRight > 0) {
    //   element.style.marginLeft = `-${Math.abs(marginRight)}px`;
    // } else {
    //   element.style.paddingRight = `${Math.abs(marginRight)}px`;
    // }
  }
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

      const {left, width, height} = mediaSingleDom.getBoundingClientRect();

      gapCursorElement.border = 'solid 1px red';
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