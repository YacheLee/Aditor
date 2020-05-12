import { setAttrs } from '../../commands';

export function updateLayout({pos, editorView, node, layout}){
  setAttrs({pos, editorView, node, attrs: {layout}});
}
