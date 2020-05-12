import {DOMSerializer} from 'prosemirror-model';
import modules from './MediaSingleView.module.scss';
import {toDOM} from './node';

class MediaSingleView {
  constructor(node) {
    const {layout} = node.attrs;

    const {dom, contentDOM} = DOMSerializer.renderSpec(window.document, toDOM(node));
    this.dom = dom;
    this.contentDOM = contentDOM;
    this.contentDOM.classList.add( modules.MediaSingleView);
    this.contentDOM.classList.add( layout);
  }
}

export default MediaSingleView;
