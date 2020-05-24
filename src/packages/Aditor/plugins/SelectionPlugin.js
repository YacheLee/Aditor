import {Plugin, PluginKey} from 'prosemirror-state';

class ViewState{
    changeHandlers = {};

    constructor() {
        this.changeHandlers = {};
    }

    subscribe(id, cb) {
        this.changeHandlers[id] = cb;
    }

    unsubscribe(id) {
        delete this.changeHandlers[id];
    }

    notifyNewSelection(fromPos, toPos) {
        Object.keys(this.changeHandlers).forEach(key=>{
            const cb = this.changeHandlers[key];
            cb(fromPos, toPos);
        });
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
