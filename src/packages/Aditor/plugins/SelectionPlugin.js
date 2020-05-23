import {Plugin, PluginKey} from 'prosemirror-state';

class ViewState{
    changeHandlers = [];

    constructor() {
        this.changeHandlers = [];
    }

    subscribe(cb) {
        this.changeHandlers.push(cb);
    }

    unsubscribe(cb) {
        this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
    }

    notifyNewSelection(fromPos, toPos) {
        this.changeHandlers.forEach(cb => cb(fromPos, toPos));
    }
}

export const key = new PluginKey('SelectionPlugin');

function SelectionPlugin() {
    return new Plugin({
        state: {
            init(){
                return new ViewState();
            },
            apply(_tr, pluginState){
                return pluginState;
            }
        },
        key,
        view(editorView){
            const pluginState = key.getState(editorView.state);

            return {
                update(editorView){
                    const {from, to } = editorView.state.selection;
                    pluginState.notifyNewSelection(from, to);
                }
            };
        }
    });
}

export default SelectionPlugin;
