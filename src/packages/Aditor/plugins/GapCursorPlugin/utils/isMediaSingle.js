function isMediaSingle(mediaSingleNode){
  if (!mediaSingleNode) {
    return false;
  }
  return (
    !!mediaSingleNode &&
    mediaSingleNode.nodeType === Node.ELEMENT_NODE &&
    mediaSingleNode.classList.contains('media-single')
  );
}

export default isMediaSingle;