import {PARAGRAPH_VALUE} from './config';

function getLabel(value){
    return value === PARAGRAPH_VALUE ? "Paragraph" : `Heading ${value}`;
}

export default getLabel;
