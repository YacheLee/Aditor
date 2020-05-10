import React from 'react';

function Image({node, editorView, getPos}){
  const {src, alt, title, width, height} = node.attrs;
  return <img
    src={src}
    alt={alt}
    title={title}
    width={width}
    height={height}
  />
}

export default Image;
