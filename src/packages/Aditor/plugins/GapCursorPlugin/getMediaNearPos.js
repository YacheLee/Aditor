function getMediaNearPos(doc, $pos, schema, dir = -1,){
  let $currentPos = $pos;
  let currentNode = null;
  const { mediaSingle, media, mediaGroup } = schema.nodes;

  do {
    $currentPos = doc.resolve(
      dir === -1 ? $currentPos.before() : $currentPos.after(),
    );

    if (!$currentPos) {
      return null;
    }

    currentNode =
      (dir === -1 ? $currentPos.nodeBefore : $currentPos.nodeAfter) ||
      $currentPos.parent;

    if (!currentNode || currentNode.type === schema.nodes.doc) {
      return null;
    }

    if (
      currentNode.type === mediaSingle ||
      currentNode.type === media ||
      currentNode.type === mediaGroup
    ) {
      return currentNode;
    }
  } while ($currentPos.depth > 0);

  return null;
}

export default getMediaNearPos;