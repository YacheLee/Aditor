import React, { useState } from 'react';
import ResizableImage from './ResizableImage';

function ImageNodeView({src, title, enableToResize, width: _width, height: _height, onResizeEnd, onImageClick}) {
    const [width, setWidth] = useState(_width);
    const [height, setHeight] = useState(_height);

    return <div onMouseDown={e => {
        e.preventDefault();
    }}>
        <ResizableImage
            enableToResize={enableToResize}
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
}

export default ImageNodeView;
