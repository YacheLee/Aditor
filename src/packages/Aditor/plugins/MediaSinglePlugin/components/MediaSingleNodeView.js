import React from 'react';
import ImagePopover from './ImagePopover';
import ImageNodeView from './ImageNodeView';

function MediaSingleNodeView({src, title, width, height, layout, focus, onLayoutChange, onImageClick, onResizeEnd}){
  return <div>
    <ImageNodeView
      src={src}
      title={title}
      width={width}
      height={height}
      enableToResize={focus}
      onResizeEnd={onResizeEnd}
      onImageClick={onImageClick}
    />

    {focus && <ImagePopover
      layout={layout}
      onLayoutChange={onLayoutChange}
    />}
  </div>
}

export default MediaSingleNodeView;
