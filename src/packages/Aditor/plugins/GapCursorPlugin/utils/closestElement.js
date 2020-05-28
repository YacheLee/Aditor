function closest(node, s){
  let el = node;

  if (!el) {
    return null;
  }
  if (!document.documentElement || !document.documentElement.contains(el)) {
    return null;
  }

  if (el.closest) {
    return el.closest(s);
  }

  const matches = el.matches ? 'matches' : 'msMatchesSelector';

  do {
    // @ts-ignore
    if (el[matches] && el[matches](s)) {
      return el;
    }
    el = (el.parentElement || el.parentNode);
  } while (el !== null && el.nodeType === 1);
  return null;
}

function closestElement(node, s){
  return closest(node, s);
}

export default closestElement;