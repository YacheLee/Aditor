import React, {useState} from 'react';
import ResizableImage from './ResizableImage';
import getFocus from '../getFocus';
import {selectNode, setImageAttrs} from '../commands';
import ImagePopover from "./ImagePopover";
import setLayout from "../../MediaSinglePlugin/setLayout";
import getLayout from "../../MediaSinglePlugin/getLayout";

function ImageNodeView({node, editorView, pos}) {
    const {attrs = {}} = node;
    const {src, title} = attrs;

    const layout = getLayout({editorView, pos});
    const focus = getFocus(editorView, pos);
    const [width, setWidth] = useState(attrs.width);
    const [height, setHeight] = useState(attrs.height);

    return <div onMouseDown={e => {
        e.preventDefault();
    }}>
        <ResizableImage
            enableToResize={focus}
            src={src}
            title={title}
            width={width}
            height={height}
            setWidth={setWidth}
            setHeight={setHeight}
            onImageClick={(e)=>{
                //focus the image node
                selectNode(editorView, pos);
            }}
            onResizeEnd={({width, height})=>{
                setImageAttrs({ pos, editorView, node, attrs: { ...attrs, width, height }});
                selectNode(editorView, pos);
            }}
        />
        {focus && <ImagePopover
            layout={layout}
            onLayoutClick={layout=>{
                setLayout({pos, editorView, layout});
                selectNode(editorView, pos);
            }}
        />}
    </div>
}

export default ImageNodeView;
