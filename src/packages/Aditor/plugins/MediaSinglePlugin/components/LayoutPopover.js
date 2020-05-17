import React, {useState} from 'react';
import { LAYOUT_CENTER, LAYOUT_LEFT, LAYOUT_RIGHT, LAYOUT_WRAP_LEFT, LAYOUT_WRAP_RIGHT } from '../';

const layouts = [
    {
        label: "Align left",
        value: LAYOUT_LEFT,
    },
    {
        label: "Align center",
        value: LAYOUT_CENTER,
    },
    {
        label: "Align right",
        value: LAYOUT_RIGHT,
    },
    {
        label: "Wrap left",
        value: LAYOUT_WRAP_LEFT,
    },
    {
        label: "Wrap right",
        value: LAYOUT_WRAP_RIGHT,
    }
];

function LayoutPopover({layout, onLayoutChange}) {
    return <div>
        {layouts.map(({label, value}, index)=>{
            const isSelecting = value === layout;

            return <button style={{border: `solid ${isSelecting ? 1: 0}px red`}} key={`ImageNodeView_Popover_${value}_${index}`} onClick={()=>{
                onLayoutChange(value);
            }}>{label}</button>
        })}
    </div>
}

export default LayoutPopover;
