import { Plugin, PluginKey } from 'prosemirror-state';

class ViewState{
    changeHandlers = {};
    from = undefined;
    to = undefined;

    constructor() {
        this.changeHandlers = {};
        this.from = undefined;
        this.to = undefined;
    }

    subscribe(id, cb) {
        this.changeHandlers[id] = cb;
    }

    unsubscribe(id) {
        delete this.changeHandlers[id];
    }

    notifyNewSelection(fromPos, toPos) {
        this.from = fromPos;
        this.to = toPos;
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
                    //If the selection is the same, do not notify our subscribers
                    if(pluginState.from !== from && pluginState.to !== to){
                      pluginState.notifyNewSelection(from, to);
                    }
                }
            };
        }
    });
}

export default SelectionPlugin;
