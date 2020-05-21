import {Plugin, PluginKey} from 'prosemirror-state';
import isSelectingMedia from "./isSelectingMedia";

const key = new PluginKey('MediaSinglePlugin');

function MediaSinglePlugin() {
    return new Plugin({
        key,
        props: {
            handleDOMEvents: {
                keydown: function (editorView, event) {
                    if(isSelectingMedia(editorView)) {
                        event.preventDefault();
                    }
                },
            }
        }
    });
}

export default MediaSinglePlugin;
