import React from 'react';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import LayoutPopover from './LayoutPopover';
import Image from './Image';
import getStyle from "../getStyle";

function MediaSingleReactView({id, src, title, width, height, layout, onLayoutChange, focus, onImageClick, onResizeEnd, onBlur}){
  return <ClickAwayListener onClickAway={onBlur}>
      <div id={id} style={getStyle(layout)}>
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
