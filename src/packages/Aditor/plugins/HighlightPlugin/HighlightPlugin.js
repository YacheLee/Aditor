import { AllSelection, Plugin } from 'prosemirror-state';
import modules from './HighlightPlugin.module.css';

function getStart({ isFirst, fromTextOffset, isAllSelection }) {
  if (isAllSelection) {
    return 0;
  } else if (isFirst) {
    return fromTextOffset;
  }
  return 0;
}

function getEnd({ isLast, textLength, toTextOffset, isAllSelection }) {
  if (isAllSelection) {
    return textLength;
  } else if (isLast) {
    return toTextOffset;
  }
  return textLength;
}

function getTextNodes(dom) {
  if (dom.childNodes.length === 0) {
    return [];
  } else {
    let arr = [];
    [...dom.childNodes].forEach((child) => {
      if (child.nodeType === window.Node.TEXT_NODE) {
        arr.push(child);
      }
      arr = arr.concat(getTextNodes(child));
    });
    return arr;
  }
}

function addOverlay(editorView) {
  const { $from, $to } = editorView.state.selection;
  const isAllSelection = editorView.state.selection instanceof AllSelection;
  const fromTextOffset = $from.parentOffset;
  const toTextOffset = $to.parentOffset;

  const nodes = [];
  editorView.state.doc.nodesBetween($from.pos, $to.pos, function (
    node,
    nodePos
  ) {
    if (node.isBlock) {
      nodes.push({ node, nodePos });
    }
  });

  nodes.forEach(function ({ node, nodePos }, index) {
    const isFirst = index === 0;
    const isLast = index === nodes.length - 1;
    const dom = editorView.nodeDOM(nodePos);

    const textNodes = getTextNodes(dom);
    const firstTextNode = textNodes[0];

    const textLength = firstTextNode.length;
    const textRange = document.createRange();
    const _start = getStart({ isFirst, fromTextOffset, isAllSelection });
    const _end = getEnd({ isLast, textLength, toTextOffset, isAllSelection });

    textRange.setStart(firstTextNode, _start);
    textRange.setEnd(firstTextNode, _end);
    const { width, height, left, top } = textRange.getBoundingClientRect();

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.cursor = 'text';
    overlay.style.position = 'absolute';
    overlay.style.display = '';
    overlay.style.left = left + 'px';
    overlay.style.top = top + 'px';
    overlay.style.width = `${width}px`;
    overlay.style.height = `${height}px`;
    overlay.style.backgroundColor = 'rgb(118, 167, 250)';
    overlay.style.opacity = '0.15';
    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
    });
    document.body.appendChild(overlay);
  });
}

function removeOverlay() {
  const elements = document.querySelectorAll('.overlay');
  elements.forEach((e) => {
    e.remove();
  });
}

function sync(editorView){
  removeOverlay(editorView);
  addOverlay(editorView);
}

class View{
  constructor(editorView) {
    this.editorView = editorView;
    editorView.dom.classList.add(modules.highlightPlugin);
  }
  update(editorView){
    const { from, to } = editorView.state.selection;
    if(from !== to){
      sync(editorView);
    }
    else{
      removeOverlay();
    }
  }
}

function HighlightPlugin() {
  const plugin = new Plugin({
    view(editorView) {
      return new View(editorView);
    }
  });

  return plugin;
}
export default HighlightPlugin;
