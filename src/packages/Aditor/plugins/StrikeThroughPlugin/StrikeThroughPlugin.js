import {MdFormatStrikethrough} from 'react-icons/md';
import MarkPlugin from '../MarkPlugin';
import mark from './mark';

function StrikeThroughPlugin(toolbarDom){
    return MarkPlugin(toolbarDom, MdFormatStrikethrough, mark, 'del', 'del');
}

export default StrikeThroughPlugin;
