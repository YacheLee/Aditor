import React, { useState } from 'react';
import styled from 'styled-components';
import ResizableImage from './components/ResizableImage';
import { DEFAULT_LAYOUT } from './config';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { changeColor } from '../TextColorPlugin/commands';

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

function ImageNodeView({node, editorView, getPos}) {
  const pos = getPos();
  const {attrs={}} = node;
  const { layout = DEFAULT_LAYOUT } = attrs;

  return <Layout layout={layout}>
      <ResizableImage
        node={node}
        editorView={editorView}
        pos={pos}
      />
    </Layout>
}

export default ImageNodeView;
