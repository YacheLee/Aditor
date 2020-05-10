import React, { useState } from 'react';
import { Resizable } from 're-resizable';

const CustomHandle = props => (
  <div
    style={{
      background: '#fff',
      borderRadius: '2px',
      border: '1px solid #ddd',
      height: '100%',
      width: '100%',
      padding: 0,
    }}
    {...props}
  />
);

function Image({node, editorView, getPos}){
  const {src, alt, title, width: _width, height: _height} = node.attrs;
  const [width, setWidth] = useState(_width);
  const [height, setHeight] = useState(_height);

  return  <Resizable
    size={{ width, height }}
    style={{display: "inline-block"}}
    handleComponent={{
      bottomRight: <CustomHandle />,
      topRight: <CustomHandle />,
      topLeft: <CustomHandle />,
      bottomLeft: <CustomHandle />,
      bottom: <CustomHandle />,
      right: <CustomHandle />,
      top: <CustomHandle />,
      left: <CustomHandle />,
    }}
    onResizeStop={(event, direction, refToElement, delta)=>{
      setWidth(width + delta.width);
      setHeight(height + delta.height);
    }}
  >
    <img
      width={width}
      height={height}
      src={src}
      alt={alt}
      title={title}
    />
  </Resizable>
}

export default Image;
