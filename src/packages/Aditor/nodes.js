import {name as imageNodeName, node as imageNode} from './plugins/ImagePlugin/node';
import {name as headingNodeName, node as headingNode} from './plugins/HeadingPlugin/node';
import {name as mediaSingleNodeName, node as mediaSingleNode} from './plugins/MediaSinglePlugin/node';

export default {
    doc: {
        content: 'block+'
    },
    paragraph: {
        content: 'inline*',
        group: 'block',
        parseDOM: [{tag: 'p'}],
        toDOM() {
            return ['p', 0];
        }
    },
    [imageNodeName]: imageNode,
    [headingNodeName]: headingNode,
    [mediaSingleNodeName]: mediaSingleNode,
    text: {
        group: 'inline',
        inline: true
    },
}
