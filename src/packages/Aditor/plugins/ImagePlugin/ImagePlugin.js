import { Plugin, PluginKey } from 'prosemirror-state';

export const pluginKey = new PluginKey('imagePlugin');

function ImagePlugin(toolbarDOM){
  return new Plugin({
    key: pluginKey
  });
}

export default ImagePlugin;
