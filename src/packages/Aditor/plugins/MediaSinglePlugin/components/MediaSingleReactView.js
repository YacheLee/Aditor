import React from 'react';
import LayoutPopover from './LayoutPopover';
import Image from './Image';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

function MediaSingleReactView({id, src, title, width, height, layout, onLayoutChange, focus, onImageClick, onResizeEnd, onBlur}){
  return <ClickAwayListener onClickAway={onBlur}>
      <div id={id}>
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
  </ClickAwayListener>
}

export default MediaSingleReactView;
