function isTextBlockNearPos(doc, schema, $pos, dir){
  let $currentPos = $pos;
  let currentNode = dir === -1 ? $currentPos.nodeBefore : $currentPos.nodeAfter;

  // If next node is a text or a text block bail out early.
  if (currentNode && (currentNode.isTextblock || currentNode.isText)) {
    return true;
  }

  while ($currentPos.depth > 0) {
    $currentPos = doc.resolve(
      dir === -1 ? $currentPos.before() : $currentPos.after(),
    );

    if (!$currentPos) {
      return false;
    }

    currentNode =
      (dir === -1 ? $currentPos.nodeBefore : $currentPos.nodeAfter) ||
      $currentPos.parent;

    if (!currentNode || currentNode.type === schema.nodes.doc) {
      return false;
    }

    if (currentNode.isTextblock) {
      return true;
    }
  }

  let childNode = currentNode;

  while (childNode && childNode.firstChild) {
    childNode = childNode.firstChild;
    if (childNode && (childNode.isTextblock || childNode.isText)) {
      return true;
    }
  }

  return false;
}

export default isTextBlockNearPos;