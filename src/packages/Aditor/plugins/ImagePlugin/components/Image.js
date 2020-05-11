import React  from 'react';

function Image({node, editorView, getPos}){
  const {src, alt, title, width, height} = node.attrs;

  return <img
      width={width}
      height={height}
      src={src}
      alt={alt}
      title={title}
    />
}

export default Image;
