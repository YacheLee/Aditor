import {MdFormatItalic} from 'react-icons/md';
import MarkPlugin from '../MarkPlugin';
import mark from './mark';

function ItalicPlugin(toolbarDom){
    return MarkPlugin(toolbarDom, MdFormatItalic, mark, 'em', 'em', 'Mod-i');
}
export default ItalicPlugin;
