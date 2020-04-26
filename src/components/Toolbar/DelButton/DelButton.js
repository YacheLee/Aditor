import React, {useContext} from 'react';
import {MdStrikethroughS} from 'react-icons/md';
import ToolbarButton from '../ToolbarButton';
import EditorViewContext from '../../../contexts/EditorViewContext';
import {isValue, toggleType} from '../../../utils';

function DelButton() {
  const { editorView } = useContext(EditorViewContext);
  const isActive = isValue(editorView, 'del');

  return (
    <ToolbarButton
      component={MdStrikethroughS}
      isActive={isActive}
      onClick={(e) => {
        toggleType(e, editorView, 'del');
      }}
    />
  );
}

export default DelButton;
