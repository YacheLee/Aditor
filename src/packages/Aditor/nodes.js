import {name as headingNodeName, node as headingNode} from './plugins/HeadingPlugin/node';
import {name as mediaSingleNodeName, node as mediaSingleNode} from './plugins/MediaSinglePlugin/nodes/mediaSingle';
import {name as mediaName, node as mediaNode} from './plugins/MediaSinglePlugin/nodes/media';

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
    [headingNodeName]: headingNode,
    [mediaName]: mediaNode,
    [mediaSingleNodeName]: mediaSingleNode,
    text: {
        group: 'inline',
        inline: true
    },
}
