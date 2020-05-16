import React, {useState} from 'react';

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
