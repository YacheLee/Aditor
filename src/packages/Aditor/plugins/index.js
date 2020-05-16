import {history} from 'prosemirror-history';
import {keymap} from 'prosemirror-keymap';
import {baseKeymap} from 'prosemirror-commands';
import {gapCursor} from 'prosemirror-gapcursor';
import HighlightPlugin from './HighlightPlugin';
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
import ImagePlugin from './ImagePlugin';
import {dropCursor} from "prosemirror-dropcursor";

function plugins(toolbarDom) {
  return [
    CursorPlugin(),
    HighlightPlugin(),
    history(),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
    UndoPlugin(toolbarDom),
    RedoPlugin(toolbarDom),
    HeadingPlugin(toolbarDom),
    BoldPlugin(toolbarDom),
    ItalicPlugin(toolbarDom),
    UnderlinePlugin(toolbarDom),
    StrikeThroughPlugin(toolbarDom),
    LinkPlugin(toolbarDom),
    TextColorPlugin(toolbarDom),
    ImagePlugin(toolbarDom),
  ];
}

export default plugins;
