import {NodeSelection} from "prosemirror-state";

export function setImageSize({editorView, attrs, mediaSinglePos, mediaPos, width, height}) {
    let tr = editorView.state.tr;
    tr.setNodeMarkup(mediaPos, undefined, {...attrs, width, height});
    editorView.dispatch(tr.setSelection(NodeSelection.create(tr.doc, mediaSinglePos)));
}

export function setLayout({editorView, pos, layout}) {
    let tr = editorView.state.tr;
    tr.setNodeMarkup(pos, null, {layout})
    editorView.dispatch(tr.setSelection(NodeSelection.create(tr.doc, pos)));
}
