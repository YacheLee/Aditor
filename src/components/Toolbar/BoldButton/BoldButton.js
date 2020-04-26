import React, {useContext} from 'react';
import {MdFormatBold} from 'react-icons/md';
import ToolbarButton from '../ToolbarButton';
import EditorViewContext from '../../../contexts/EditorViewContext';
import {isValue, toggleType} from '../../../utils';

function BoldButton() {
  const { editorView } = useContext(EditorViewContext);
  const isActive = isValue(editorView, 'strong');

  return (
    <ToolbarButton
      component={MdFormatBold}
      isActive={isActive}
      onClick={(e) => {
        toggleType(e, editorView, 'strong');
      }}
    />
  );
}

export default BoldButton;
