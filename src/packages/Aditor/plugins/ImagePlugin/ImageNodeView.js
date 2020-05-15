import React, {useState} from 'react';
import styled from 'styled-components';
import ResizableImage from './components/ResizableImage';
import {DEFAULT_LAYOUT} from './config';
import getFocus from './getFocus';
import {selectNode, setImageAttrs} from './commands';

const Layout = styled.div`
  position: relative;
  display: flex;
  justify-content: ${props => props.layout};
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
            focus={focus}
            src={src}
            title={title}
            width={width}
            height={height}
            editorView={editorView}
            pos={pos}
            setWidth={setWidth}
            setHeight={setHeight}
            onImageClick={()=>{
                selectNode(editorView, pos);
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
