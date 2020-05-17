import React from 'react';
import LayoutPopover from './LayoutPopover';
import Image from './Image';

function MediaSingleReactView({id, src, title, width, height, layout, focus, onLayoutChange, onImageClick, onResizeEnd}){
  return <div id={id}>
    <Image
      src={src}
      title={title}
      width={width}
      height={height}
      enableToResize={focus}
      onResizeEnd={onResizeEnd}
      onImageClick={onImageClick}
    />

    {focus && <LayoutPopover
      layout={layout}
      onLayoutChange={onLayoutChange}
    />}
  </div>
}

export default MediaSingleReactView;