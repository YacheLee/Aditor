import { Plugin, PluginKey } from 'prosemirror-state';
import { updateLayout } from './commands';

const pluginKey = new PluginKey('MediaSinglePlugin');

function MediaSinglePlugin(){
  return new Plugin({
    key: pluginKey,
    props: {
      handleClickOn: (editorView, pos, node, nodePos)=>{
        // updateLayout({pos: nodePos, editorView, node, layout: "left"});
      }
    }
  });
}

export default MediaSinglePlugin;
