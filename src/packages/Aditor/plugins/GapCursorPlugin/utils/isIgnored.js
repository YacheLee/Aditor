// we don't show gap cursor for those nodes
const IGNORED_NODES = [
  'paragraph',
  'heading',
];

function isIgnored(node){
  return !!node && IGNORED_NODES.indexOf(node.type.name) !== -1;
}

export default isIgnored;
