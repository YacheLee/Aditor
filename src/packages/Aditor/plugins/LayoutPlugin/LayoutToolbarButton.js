import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';
import React from 'react';

function LayoutToolbarButton({Icon, disabled, onClick}){
  return <ToolbarButtonStyle disabled={disabled} onClick={onClick}>
    <Icon />
  </ToolbarButtonStyle>
}

export default LayoutToolbarButton;
