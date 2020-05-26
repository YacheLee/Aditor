import React, { useEffect, useRef, useState } from 'react';
import Popper from '@material-ui/core/Popper';
import getStyle from '../getStyle';
import isMouseDownEventFromResize from '../isMouseDownEventFromResize';
import ResizableImage from './ResizableImage';
import LayoutPopover from './LayoutPopover';

function MediaSingleReactView({id, focus, src, title, onLayoutChange, width: _width, height: _height, layout, onImageClick, onResizeEnd}) {
  const [width, setWidth] = useState(_width);
  const [height, setHeight] = useState(_height);
  const [anchorEl, setAnchorEl] = useState(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    setAnchorEl(mediaRef.current);
  }, [mediaRef]);

  return <div id={id} style={getStyle(layout)}>
    <div onMouseDown={e => {
      if (isMouseDownEventFromResize(e)) {
        e.preventDefault();
      }
    }}>
      <div ref={mediaRef}>
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
      </div>
        {
          focus && document.body.contains(anchorEl) && <Popper
            id={`MediaSingle_Popover_${id}`}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            disablePortal={true}
            style={{zIndex: 1}}
          >
            <LayoutPopover layout={layout} onLayoutChange={onLayoutChange}/>
          </Popper>
        }
    </div>
  </div>
}

export default MediaSingleReactView;
