import {MdFormatBold} from 'react-icons/md';
import MarkPlugin from '../MarkPlugin';
import mark from './mark';

function BoldPlugin(toolbarDom){
    return MarkPlugin(toolbarDom, MdFormatBold, mark, 'strong', 'strong', 'Mod-b')
}

export default BoldPlugin;
