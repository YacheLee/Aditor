function isMediaSingle(node){
  if (!node) {
    return false;
  }
  const firstChild = node.firstChild;
  return (
    !!firstChild &&
    firstChild.nodeType === Node.ELEMENT_NODE &&
    firstChild.classList.contains('media-single')
  );
}

export default isMediaSingle;