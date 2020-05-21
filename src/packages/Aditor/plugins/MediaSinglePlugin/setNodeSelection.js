import {NodeSelection} from "prosemirror-state";

function setNodeSelection(editorView, pos){
    const { state, dispatch } = editorView;

    if (!Number.isFinite(pos)) {
        return;
    }

    const tr = state.tr.setSelection(NodeSelection.create(state.doc, pos));
    dispatch(tr);
}

export default setNodeSelection;
