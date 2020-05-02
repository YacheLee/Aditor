function marks(plugins=[]){
  return plugins.map(({spec}) => spec.mark).filter(e => !!e).reduce((prev, cur)=>{
      prev = {...prev, ...cur};
      return prev;
  }, {});
}

export default marks;
