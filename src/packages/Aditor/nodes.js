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
    toDOM() {
      return ['p', 0];
    }
  },
  [imageNodeName]: imageNode,
  [headingNodeName]: headingNode,
  text: {
    group: 'inline',
    inline: true
  },
}
