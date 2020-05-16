import React, {useState} from 'react';
import styled from 'styled-components';
import ResizableImage from './ResizableImage';
import {DEFAULT_LAYOUT} from '../config';
import getFocus from '../getFocus';
import {selectNode, setImageAttrs} from '../commands';
import PopoverManager from "../../../PopoverManager";
import ImagePopover from "./ImagePopover";

function getJustifyContent(layout = DEFAULT_LAYOUT) {
    if (layout === "left") {
        return "flex-start";
    }
    else if (layout === "center") {
        return "center";
    }
    else if (layout === "right") {
        return "flex-end";
    }
    return "left";
}

const Layout = styled.div`
  position: relative;
  display: flex;
  justify-content: ${props => getJustifyContent(props.layout)};
`;

function ImageNodeView({node, editorView, pos}) {
    const {attrs = {}} = node;
    const {layout = DEFAULT_LAYOUT, src, title} = attrs;

    const focus = getFocus(editorView, pos);
    const [width, setWidth] = useState(attrs.width);
    const [height, setHeight] = useState(attrs.height);

    return <Layout layout={layout} onMouseDown={e => {
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

                //render the popover
                PopoverManager.setPopoverAnchorElement(e.currentTarget);
                PopoverManager.setPopoverContent(
                    <ImagePopover
                        layout={layout}
                        onLayoutClick={layout=>{
                            setImageAttrs({pos, editorView, node, attrs: {...attrs, layout}});
                            selectNode(editorView, pos);
                        }}
                    />
                )
            }}
            onResizeEnd={({width, height})=>{
                const attrs = { width, height };
                setImageAttrs({ pos, editorView, node, attrs });
                selectNode(editorView, pos);
            }}
        />
    </Layout>
}

export default ImageNodeView;
