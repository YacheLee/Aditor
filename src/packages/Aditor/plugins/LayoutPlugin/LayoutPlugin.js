import React from 'react';
import { Plugin, PluginKey } from 'prosemirror-state';
import LayoutView from './LayoutView';

const pluginKey = new PluginKey('LayoutPlugin');

function LayoutPlugin(toolbarDom) {
  return new Plugin({
    key: pluginKey,
    view(editorView) {
      const view = new LayoutView(editorView, toolbarDom);
      toolbarDom.append(view.dom);
      return view;
    }
  });
}

export default LayoutPlugin;
