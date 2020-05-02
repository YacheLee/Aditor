import {history} from "prosemirror-history";
import {keymap} from 'prosemirror-keymap';
import {baseKeymap} from 'prosemirror-commands';
import {dropCursor} from 'prosemirror-dropcursor';
import {gapCursor} from 'prosemirror-gapcursor';
import UndoPlugin from "./UndoPlugin";
import RedoPlugin from "./RedoPlugin";
import BoldPlugin from "./BoldPlugin";
import ItalicPlugin from './ItalicPlugin';
import UnderlinePlugin from './UnderlinePlugin';
import StrikeThroughPlugin from './StrikeThroughPlugin';
import TextColorPlugin from './TextColorPlugin';
import HeadingPlugin from './HeadingPlugin';
import LinkPlugin from './LinkPlugin';

function plugins(toolbarDom){
    return [
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
        TextColorPlugin(toolbarDom),
        LinkPlugin(toolbarDom),
    ];
}

export default plugins;
