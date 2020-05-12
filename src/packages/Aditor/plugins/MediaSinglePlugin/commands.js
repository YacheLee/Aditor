import { setAttrs } from '../../commands';

export function updateLayout({pos, editorView, node, layout}){
  setAttrs({pos, editorView, node, attrs: {layout}});
}

export function getLayout(mediaSingleNode){
  if(!mediaSingleNode) return 'left';

  return mediaSingleNode.node.attrs.layout;
}
