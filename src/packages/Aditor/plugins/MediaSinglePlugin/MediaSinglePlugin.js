import { Plugin, PluginKey } from 'prosemirror-state';

const key = new PluginKey('MediaSinglePlugin');

function MediaSinglePlugin() {
    return new Plugin({
        key,
        props: {
            handleDOMEvents: {
                keydown: function (editorView, event) {
                    // if(isSelectingMediaSingle(editorView.state.selection)) {
                    //     event.preventDefault();
                    // }
                },
            }
        }
    });
}

export default MediaSinglePlugin;
