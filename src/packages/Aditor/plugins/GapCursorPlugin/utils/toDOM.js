import Side from '../Side';

const nestedCases = {
  'tableView-content-wrap': 'table',
  'mediaSingleView-content-wrap': '.media-single',
};

function isLeftCursor(side){
  return side === Side.LEFT;
}

function getBreakoutModeFromTargetNode(node){
  let layout;
  if (node.attrs.layout) {
    layout = node.attrs.layout;
  }

  if (node.marks && node.marks.length) {
    layout = (
      node.marks.find(mark => mark.type.name === 'breakout') || {
        attrs: { mode: '' },
      }
    ).attrs.mode;
  }

  if (['wide', 'full-width'].indexOf(layout) === -1) {
    return '';
  }

  return layout;
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

function computeNestedStyle(dom){
  const foundKey = Object.keys(nestedCases).find(className =>
    dom.classList.contains(className),
  );
  const nestedSelector = foundKey && nestedCases[foundKey];

  if (nestedSelector) {
    const nestedElement = dom.querySelector(nestedSelector);
    if (nestedElement) {
      return window.getComputedStyle(nestedElement);
    }
  }
}

function mutateElementStyle(element, style, side){
  if (isLeftCursor(side)) {
    element.style.marginLeft = style.getPropertyValue('margin-left');
  } else {
    const marginRight = parseFloat(style.getPropertyValue('margin-right'));
    if (marginRight > 0) {
      element.style.marginLeft = `-${Math.abs(marginRight)}px`;
    } else {
      element.style.paddingRight = `${Math.abs(marginRight)}px`;
    }
  }
}

function toDOM(view, getPos){
  const selection = view.state.selection;
  const { $from, side } = selection;
  const isRightCursor = side === Side.RIGHT;
  const node = isRightCursor ? $from.nodeBefore : $from.nodeAfter;
  const nodeStart = getPos();
  const dom = view.nodeDOM(nodeStart);

  const element = document.createElement('span');
  element.className = `ProseMirror-gapcursor ${
    isRightCursor ? '-right' : '-left'
  }`;
  element.appendChild(document.createElement('span'));

  if (dom instanceof HTMLElement && element.firstChild) {
    const style = computeNestedStyle(dom) || window.getComputedStyle(dom);

    const gapCursor = element.firstChild;
    gapCursor.style.height = `${measureHeight(style)}px`;

    // TODO remove this table specific piece. need to figure out margin collapsing logic
    if (nodeStart !== 0 || (node && node.type.name === 'table')) {
      gapCursor.style.marginTop = style.getPropertyValue('margin-top');
    }

    const breakoutMode = node && getBreakoutModeFromTargetNode(node);
    if (breakoutMode) {
      gapCursor.setAttribute('layout', breakoutMode);
      gapCursor.style.width = `${measureWidth(style)}px`;
    } else {
      mutateElementStyle(gapCursor, style, selection.side);
    }
  }

  return element;
}

export default toDOM;