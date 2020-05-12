import { setAttrs } from '../../commands';
import { DEFAULT_LAYOUT } from './config';

export function updateLayout({pos, editorView, node, layout}){
  setAttrs({pos, editorView, node, attrs: {layout}});
}

export function getLayout(mediaSingleNode){
  if(!mediaSingleNode) return DEFAULT_LAYOUT;

  return mediaSingleNode.node.attrs.layout;
}
