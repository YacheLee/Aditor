import React, {useState} from 'react';
import {DEFAULT_LAYOUT} from '../config';

function getJustifyContent(layout = DEFAULT_LAYOUT) {
    if (layout === "left") {
        return "flex-start";
    }
    else if (layout === "center") {
        return "center";
    }
    else if (layout === "right") {
        return "flex-end";
    }
    return "left";
}
const layouts = [
    {
        label: "Left",
        value: "left",
    },
    {
        label: "Center",
        value: "center",
    },
    {
        label: "Right",
        value: "right",
    }
];

function ImagePopover({layout: initLayout, onLayoutClick}) {
    const [layout, setLayout] = useState(initLayout);

    return <div>
        {layouts.map(({label, value}, index)=>{
            const isSelecting = value === layout;

            return <button style={{border: `solid ${isSelecting ? 1: 0}px red`}} key={`ImageNodeView_Popover_${value}_${index}`} onClick={()=>{
                setLayout(value);
                onLayoutClick(value);
            }}>{label}</button>
        })}
    </div>
}

export default ImagePopover;
