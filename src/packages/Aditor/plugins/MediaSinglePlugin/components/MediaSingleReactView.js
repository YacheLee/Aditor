import React, { useState } from 'react';
import getStyle from '../getStyle';
import isMouseDownEventFromResize from '../isMouseDownEventFromResize';
import ResizableImage from './ResizableImage';
import LayoutPopover from './LayoutPopover';

const mediaClassName = "media";

function MediaSingleReactView({id, focus, src, title, onLayoutChange, width: _width, height: _height, layout, onImageClick, onResizeEnd}) {
    const [width, setWidth] = useState(_width);
    const [height, setHeight] = useState(_height);

    return <div id={id} style={getStyle(layout)}>
        <div onMouseDown={e => {
            if (isMouseDownEventFromResize(e)) {
                e.preventDefault();
            }
        }}>
          <div className={mediaClassName}>
            <ResizableImage
                  enableToResize={focus}
                  src={src}
                  title={title}
                  width={width}
                  height={height}
                  setWidth={setWidth}
                  setHeight={setHeight}
                  onResizeEnd={onResizeEnd}
                  onImageClick={onImageClick}
              />
              { focus && <LayoutPopover layout={layout} onLayoutChange={layout=>{
                onLayoutChange(layout);
              }}/> }
          </div>
        </div>
    </div>
}

export default MediaSingleReactView;
