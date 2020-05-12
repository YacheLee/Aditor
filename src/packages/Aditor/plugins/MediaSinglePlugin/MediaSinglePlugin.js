import { Plugin, PluginKey } from 'prosemirror-state';

const pluginKey = new PluginKey('MediaSinglePlugin');

function MediaSinglePlugin(){
  return new Plugin({
    key: pluginKey,
  });
}

export default MediaSinglePlugin;
