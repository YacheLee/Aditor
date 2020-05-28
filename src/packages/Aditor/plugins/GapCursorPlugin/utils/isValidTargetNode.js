import isIgnored from './isIgnored';

function isValidTargetNode(node){
  return !!node && !isIgnored(node);
}

export default isValidTargetNode;