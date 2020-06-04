function atTheEndOfDoc(state){
  const { selection, doc } = state;
  return doc.nodeSize - selection.$to.pos - 2 === selection.$to.depth;
}

export default atTheEndOfDoc;