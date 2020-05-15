import React from 'react';
import styled from 'styled-components';
import ResizableImage from './components/ResizableImage';
import { DEFAULT_LAYOUT } from './config';
import getFocus from './getFocus';
import { selectNode } from './commands';

const HIDE_SELECTION_CLASS_NAME = 'ProseMirror-hideselection';

const Layout = styled.div`
  position: relative;
  display: flex;
  justify-content: ${props=>props.layout};
`;

function hideSelection(editorViewDOM){
  editorViewDOM.classList.add(HIDE_SELECTION_CLASS_NAME);
}

function showSelection(editorViewDOM){
  editorViewDOM.classList.remove(HIDE_SELECTION_CLASS_NAME);
}

function ImageNodeView({node, editorView, pos}) {
  const {attrs={}} = node;
  const { layout = DEFAULT_LAYOUT } = attrs;

  const focus = getFocus(editorView, pos);

  return <Layout layout={layout} onMouseDown={e=>{
    e.preventDefault();
  }}>
      <ResizableImage
        focus={focus}
        node={node}
        editorView={editorView}
        pos={pos}
      />
    </Layout>
}

export default ImageNodeView;
