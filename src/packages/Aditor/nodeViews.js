import MediaSingleProseMirrorNodeView from './plugins/MediaSinglePlugin/MediaSingleProseMirrorNodeView';

export default {
  mediaSingle(node, view, getPos) { return new MediaSingleProseMirrorNodeView(node, view, getPos) }
};
