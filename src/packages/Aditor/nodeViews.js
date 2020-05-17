import ProseMirrorNodeView from './plugins/ImagePlugin/ProseMirrorNodeView';

export default {
  image(node, view, getPos) { return new ProseMirrorNodeView(node, view, getPos) }
};
