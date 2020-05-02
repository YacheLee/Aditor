import React from "react";
import {CompactPicker} from 'react-color';
import {changeColor} from './commands';
import AButton from './AButton';
import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';
import PopoverManager from '../../PopoverManager';

function TextColorToolbarButton({editorView, value, toolbarButtonDom}) {
    return <ToolbarButtonStyle onClick={(event) => {
        event.preventDefault();

        //toggle
        if(PopoverManager.getAnchorEl()===toolbarButtonDom){
            PopoverManager.closePopover();
        }
        else{
            PopoverManager.setPopoverAnchorElement(toolbarButtonDom);
            PopoverManager.setPopoverContent(
                <CompactPicker color={value} onChangeComplete={({hex}) => {
                    if(hex){
                        changeColor(editorView, hex);
                        PopoverManager.closePopover();
                    }
                }} />
            );
        }
    }}>
        <AButton color={value}/>
    </ToolbarButtonStyle>
}

export default TextColorToolbarButton;
