import closestElement from './closestElement';

function isIgnoredClick(elem){
  if (elem.nodeName === 'BUTTON' || closestElement(elem, 'button')) {
    return true;
  }

  // check if target node has a parent table node
  let node = elem;
  while (node) {
    if (node.className) {
      break;
    }
    node = node.parentNode;
  }

  return false;
}

export default isIgnoredClick;