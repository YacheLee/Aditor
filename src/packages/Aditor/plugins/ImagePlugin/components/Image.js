import React from 'react';

function Image({node, editorView, getPos}){
  const {src, alt, title, width, height} = node.attrs;
  return <span onMouseUp={()=>{
    console.log("onMouseUp");
  }}>
    <img
      src={src}
      alt={alt}
      title={title}
      width={width}
      height={height}
    />
  </span>
}

export default Image;
