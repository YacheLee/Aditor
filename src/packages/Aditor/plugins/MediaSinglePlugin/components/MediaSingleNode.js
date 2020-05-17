import React from 'react';
import { setLayout, setImageSize } from '../commands';
import ImagePopover from './ImagePopover';
import ImageNodeView from './ImageNodeView';

function MediaSingleNode({node, focus, getPos, editorView}){
  const { layout } = node.attrs;

  const {firstChild: mediaNode} = node;
  const { src, title, width, height } = mediaNode.attrs;

  return <div>
    <ImageNodeView
      src={src}
      title={title}
      width={width}
      height={height}
      enableToResize={focus}
      onResizeEnd={({width, height})=>{
        setImageSize({editorView, mediaNode, width, height});
      }}
    />

    {focus && <ImagePopover
      layout={layout}
      onLayoutChange={layout=>{
        const pos = getPos();
        setLayout({pos, editorView, layout});
      }}
    />}
  </div>
}

export default MediaSingleNode;