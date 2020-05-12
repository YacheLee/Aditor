import {name as mediaSingleNodeName, node as mediaSingleNode} from './plugins/MediaSinglePlugin/node';
import {name as imageNodeName, node as imageNode} from './plugins/ImagePlugin/node';
import {name as headingNodeName, node as headingNode} from './plugins/HeadingPlugin/node';

export default {
  doc: {
    content: 'block+'
  },
  paragraph: {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM: function toDOM() {
      return ['p', 0];
    }
  },
  [mediaSingleNodeName]: mediaSingleNode,
  [imageNodeName]: imageNode,
  [headingNodeName]: headingNode,
  text: {
    group: 'inline',
    inline: true
  },
}
