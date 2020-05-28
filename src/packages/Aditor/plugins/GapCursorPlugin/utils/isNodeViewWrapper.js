function isNodeViewWrapper(node){
  if (!node) {
    return false;
  }
  return (
    !!node &&
    node.nodeType === Node.ELEMENT_NODE &&
    node.className.indexOf('-content-wrap') !== -1
  );
}

export default isNodeViewWrapper;