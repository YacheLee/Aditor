import {MdFormatUnderlined} from 'react-icons/md';
import MarkPlugin from '../MarkPlugin';
import mark from './mark';

function UnderlinePlugin(toolbarDom){
    return MarkPlugin(toolbarDom, MdFormatUnderlined, mark, 'u', 'u', 'Mod-u')
}

export default UnderlinePlugin;
