function atTheBeginningOfDoc(state){
  const { selection } = state;
  return selection.$from.pos === selection.$from.depth;
}

export default atTheBeginningOfDoc;