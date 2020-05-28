function getBreakoutModeFromTargetNode(node){
  if (node.attrs.layout) {
    return node.attrs.layout;
  }

  if (node.marks && node.marks.length) {
    return (
      node.marks.find(mark => mark.type.name === 'breakout') || {
        attrs: { mode: '' },
      }
    ).attrs.mode;
  }

  return '';
}

export default getBreakoutModeFromTargetNode