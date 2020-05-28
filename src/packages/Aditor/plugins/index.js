import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { GapCursorKeymapPlugin, GapCursorPlugin } from './GapCursorPlugin';
import UndoPlugin from './UndoPlugin';
import RedoPlugin from './RedoPlugin';
import BoldPlugin from './BoldPlugin';
import ItalicPlugin from './ItalicPlugin';
import UnderlinePlugin from './UnderlinePlugin';
import StrikeThroughPlugin from './StrikeThroughPlugin';
import TextColorPlugin from './TextColorPlugin';
import HeadingPlugin from './HeadingPlugin';
import LinkPlugin from './LinkPlugin';
import CursorPlugin from './CursorPlugin';
import MediaSinglePlugin from './MediaSinglePlugin';
import SelectionPlugin from './SelectionPlugin';
import HighlightPlugin from './HighlightPlugin/HighlightPlugin';

function plugins(toolbarDom) {
    return [
        SelectionPlugin(),
        CursorPlugin(),
        HighlightPlugin(),
        history(),
        keymap(baseKeymap),
        dropCursor(),
        GapCursorPlugin(),
        GapCursorKeymapPlugin(),
        GapCursorKeymapPlugin(),
        UndoPlugin(toolbarDom),
        RedoPlugin(toolbarDom),
        HeadingPlugin(toolbarDom),
        BoldPlugin(toolbarDom),
        ItalicPlugin(toolbarDom),
        UnderlinePlugin(toolbarDom),
        StrikeThroughPlugin(toolbarDom),
        LinkPlugin(toolbarDom),
        TextColorPlugin(toolbarDom),
        MediaSinglePlugin(toolbarDom),
    ];
}

export default plugins;
