function getDomNodeVerticalMargin(ref, side){
  let margin = 0;
  while (ref && ref.nodeType === 1) {
    const css = window.getComputedStyle(ref);
    const curMargin = parseInt(css[`margin-${side}`], 10);
    if (curMargin > margin) {
      margin = curMargin;
    }
    ref = ref[side === 'top' ? 'firstChild' : 'lastChild'];
  }
  return margin;
}

export default getDomNodeVerticalMargin;