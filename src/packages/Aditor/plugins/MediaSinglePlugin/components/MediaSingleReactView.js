import React, { useEffect, useState } from 'react';
import getStyle from "../getStyle";
import isMouseDownEventFromResize from "../isMouseDownEventFromResize";
import ResizableImage from "./ResizableImage";
import { setLayout } from '../commands';
import LayoutPopover from './LayoutPopover';
import Popover from '../../../components/Popover';
import Image, { className } from './Image';

function MediaSingleReactView({id, focus, src, title, onLayoutChange, width: _width, height: _height, layout, onImageClick, onResizeEnd}) {
    const [width, setWidth] = useState(_width);
    const [height, setHeight] = useState(_height);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(e => {
      const img = document.querySelector(`[id="${id}"] .${className}`);
      setAnchorEl(img);
    });

    return <div id={id} style={getStyle(layout)}>
        <div onMouseDown={e => {
            if (isMouseDownEventFromResize(e)) {
                e.preventDefault();
            }
        }}>
          {focus ? <ResizableImage
            enableToResize={focus}
            src={src}
            title={title}
            width={width}
            height={height}
            setWidth={setWidth}
            setHeight={setHeight}
            onResizeEnd={onResizeEnd}
            onImageClick={onImageClick}
          /> : <Image title={title} src={src} width={width} height={height} onClick={onImageClick} />}

          { focus && <Popover id={`MediaSingle_Popover_${id}`} anchorEl={anchorEl}>
            <LayoutPopover layout={layout} onLayoutChange={layout=>{
              onLayoutChange(layout);
            }}/>
          </Popover> }
        </div>
    </div>
}

export default MediaSingleReactView;
