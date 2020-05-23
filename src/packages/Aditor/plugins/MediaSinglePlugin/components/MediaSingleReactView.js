import React, {useState} from 'react';
import getStyle from "../getStyle";
import isMouseDownEventFromResize from "../isMouseDownEventFromResize";
import ResizableImage from "./ResizableImage";

function MediaSingleReactView({id, focus, src, title, width: _width, height: _height, layout, onImageClick, onResizeEnd}) {
    const [width, setWidth] = useState(_width);
    const [height, setHeight] = useState(_height);

    return <div id={id} style={getStyle(layout)}>
        <div onMouseDown={e => {
            if (isMouseDownEventFromResize(e)) {
                e.preventDefault();
            }
        }}>
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
    </div>
}

export default MediaSingleReactView;
