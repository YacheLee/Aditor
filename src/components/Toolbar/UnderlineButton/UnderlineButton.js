import React, {useContext} from 'react';
import {MdFormatUnderlined} from 'react-icons/md';
import ToolbarButton from '../ToolbarButton';
import EditorViewContext from '../../../contexts/EditorViewContext';
import {isValue, toggleType} from '../../../utils';

function UnderlineButton() {
  const { editorView } = useContext(EditorViewContext);
  const isActive = isValue(editorView, 'u');

  return (
    <ToolbarButton
      component={MdFormatUnderlined}
      isActive={isActive}
      onClick={(e) => {
        toggleType(e, editorView, 'u');
      }}
    />
  );
}

export default UnderlineButton;
