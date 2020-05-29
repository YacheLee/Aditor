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
  const { $from, side } = selection;
  const isRightCursor = side === Side.RIGHT;
  const nodeStart = getPos();
  const dom = view.nodeDOM(nodeStart);

  const element = document.createElement('span');
  element.className = `ProseMirror-gapcursor ${
    isRightCursor ? '-right' : '-left'
  }`;
  element.appendChild(document.createElement('span'));

  if (dom instanceof HTMLElement && element.firstChild) {
    const isMediaSingleView = dom.classList.contains('mediaSingleView-content-wrap');
    if(isMediaSingleView){
      const gapCursor = element.firstChild;
      const mediaSingleDom = dom.querySelector('img');
      const style = window.getComputedStyle(mediaSingleDom);

      const {left} = mediaSingleDom.getBoundingClientRect();
      gapCursor.style.height = `${measureHeight(style)}px`;
      if(isLeftCursor(side)){
        gapCursor.style.left = `${left}px`;
      }
    }
  }
  return element;
}

export default toDOM;