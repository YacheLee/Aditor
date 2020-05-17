//https://discuss.prosemirror.net/t/how-to-find-node-position-by-given-node-attribute/721

function findNode(node, pos, predicate) {
  let found = undefined;

  node.descendants((node, pos) => {
    if (predicate(node)) found = {node, pos}
    if (found) return false
  })
  return found;
}

export default findNode;
