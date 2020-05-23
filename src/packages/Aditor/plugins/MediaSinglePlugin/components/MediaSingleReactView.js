import React, {useState} from 'react';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import LayoutPopover from './LayoutPopover';
import Image from './Image';
import getStyle from "../getStyle";
import Popover from "../../../components/Popover";

function MediaSingleReactView({id, focus, src, title, width, height, layout, onLayoutChange, onImageClick, onResizeEnd, onBlur}) {
    const [anchorEl, setAnchorEl] = useState(null);

    return <ClickAwayListener onClickAway={(e)=>{
        setAnchorEl(null);
        onBlur(e);
    }}>
        <div id={id} style={getStyle(layout)}>
            <Image
                src={src}
                title={title}
                width={width}
                height={height}
                enableToResize={focus}
                onResizeEnd={onResizeEnd}
                onImageClick={(e) => {
                    onImageClick(e);
                    setAnchorEl(e.currentTarget);
                }}
            />
            <Popover id={`popover_${id}`} anchorEl={anchorEl}>
                <LayoutPopover layout={layout} onLayoutChange={onLayoutChange}/>
            </Popover>
        </div>
    </ClickAwayListener>
}

export default MediaSingleReactView;
