import { Plugin } from 'prosemirror-state';

function getStart({isFirst, fromTextOffset}){
  if(isFirst){
    return fromTextOffset;
  }
  return 0;
}

function getEnd({isLast, textLength, toTextOffset}){
  if(isLast){
    return toTextOffset;
  }
  return textLength;
}

function HighlightPlugin() {
  const plugin = new Plugin({
    update() {
      return true;
    },
    props: {
      handleDOMEvents: {
        blur: (editorView)=>{
          const {from, to, $from, $to} = editorView.state.selection;
          const fromTextOffset = $from.parentOffset;
          const toTextOffset = $to.parentOffset;

          const nodes = [];
          editorView.state.doc.nodesBetween($from.pos, $to.pos, function (node, nodePos) {
            if(node.isBlock){
              nodes.push({ node, nodePos });
            }
          });

          nodes.forEach(function({ node, nodePos }, index){
            const isFirst = index === 0;
            const isLast = index === nodes.length - 1;
            const dom = editorView.nodeDOM(nodePos);

            const textNode = [...dom.childNodes].find(child => child.nodeType === Node.TEXT_NODE);
            const textRange = document.createRange();

            const _start = getStart({ isFirst, fromTextOffset });
            const _end = getEnd({ isLast, textLength: textNode.length, toTextOffset });

            textRange.setStart(textNode, _start);
            textRange.setEnd(textNode, _end);
            const textRect = textRange.getClientRects()[0];

            const {width, height, left, top} = textRect;

            const overlay = document.createElement("div");
            overlay.className = 'overlay';
            overlay.style.cursor = "text";
            overlay.style.position = "absolute";
            overlay.style.display = "";
            overlay.style.left = left + "px";
            overlay.style.top = top + "px";
            overlay.style.width = `${width}px`;
            overlay.style.height = `${height}px`;
            overlay.style.backgroundColor = 'rgb(118, 167, 250)';
            overlay.style.opacity = "0.5";
            overlay.addEventListener('click', () => {
              overlay.style.display = "none";
            });
            document.body.appendChild(overlay);
          });
        },
        focus: ()=>{
          const elements = document.querySelectorAll('.overlay');
          elements.forEach(e=>{
            e.remove();
          })
        }
      }
    },
  });

  return plugin;
}
export default HighlightPlugin;
