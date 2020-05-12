import { setAttrs } from '../../commands';
import { DEFAULT_LAYOUT } from './config';
import { findParentNodeOfType } from 'prosemirror-utils';
import { name as mediaSingleNodeName } from './node';

export function getMediaSingle(editorView){
  const { selection } = editorView.state;
  if(selection){
    const {node, from: pos} = selection;
    if(node && node.type && node.type.name===mediaSingleNodeName){
      return {node, pos};
    }
    else{
      return findParentNodeOfType(editorView.state.schema.nodes[mediaSingleNodeName])(selection);
    }
  }
}

export function updateLayout({editorView, mediaSingle, layout}){
  if (mediaSingle) {
    const {pos, node } = mediaSingle;
    setAttrs({pos, editorView, node, attrs: {layout}});
  }
}

export function getLayout(getMediaSingle){
  if(!getMediaSingle) return DEFAULT_LAYOUT;

  return getMediaSingle.node.attrs.layout;
}
