import React from 'react';
import { Plugin, PluginKey } from 'prosemirror-state';
import isDroppedFile from './isDroppedFile';
import { safeInsert } from 'prosemirror-utils';

export const key = new PluginKey('ImagePlugin');

function ImagePlugin() {
  return new Plugin({
    props: {
      handleDOMEvents: {
        drop: (editorView, event)=>{
          if (isDroppedFile(event)){
            event.preventDefault();
            event.stopPropagation();

            const files = Array.from(event.dataTransfer.items).filter(e => e.kind === 'file').map(e=>e.getAsFile());
            if(files.length!==0){
              const {state} = editorView;
              const file = files[0];
              const src = URL.createObjectURL(file);

              const attrs = {
                layout: "center"
              };
              const mediaNode = state.schema.nodes.media.createChecked({
                type: 'external',
                id: new Date().getTime().toString(),
                src,
                width: 150,
                height: 150
              });

              const {pos} = editorView.posAtCoords({left: event.clientX, top: event.clientY});
              const mediaSingleNode = state.schema.nodes.mediaSingle.createChecked(attrs, mediaNode);
              editorView.dispatch(safeInsert(mediaSingleNode, pos)(state.tr).scrollIntoView());
            }
            return true;
          }
        }
      }
    }
  });
}

export default ImagePlugin;
