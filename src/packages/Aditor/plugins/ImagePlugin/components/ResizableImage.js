import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Resizable} from 're-resizable';
import BottomRightDot from "./BottomRightDot";

const Wrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  cursor: move;
`;

function getEnable(enableToResize){
    return {
        top: enableToResize,
        right: enableToResize,
        bottom: enableToResize,
        left: enableToResize,
        topRight: enableToResize,
        bottomRight: enableToResize,
        bottomLeft: enableToResize,
        topLeft: enableToResize
    }
}

function Component({enableToResize, src, title, width, height, setWidth, setHeight, onImageClick, onResizeEnd}) {
    const imageRef = useRef(null);
    const [dWidth, setDWidth] = useState(0);
    const [dHeight, setDHeight] = useState(0);

    const finalWidth = width + dWidth;
    const finalHeight = height + dHeight;

    return <Wrapper>
        <Resizable
            enable={getEnable(enableToResize)}
            lockAspectRatio={true}
            size={{width: finalWidth, height: finalHeight}}
            handleComponent={{
                bottomRight: <BottomRightDot />,
            }}
            onResize={(e, direction, ref, d) => {
                setDWidth(d.width);
                setDHeight(d.height);
            }}
            onResizeStop={() => {
                setDWidth(0);
                setDHeight(0);

                setWidth(finalWidth);
                setHeight(finalHeight);
                onResizeEnd({width: finalWidth, height: finalHeight});
            }}
        >
            <Image
                ref={imageRef}
                width={finalWidth}
                height={finalHeight}
                src={src}
                title={title}
                onClick={onImageClick}
            />
        </Resizable>
    </Wrapper>;
}

Component.defaultProps = {
    src: "",
    title: ""
};

Component.propTypes = {
    enableToResize: PropTypes.bool.isRequired,
    src: PropTypes.string,
    title: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    setWidth: PropTypes.func.isRequired,
    setHeight: PropTypes.func.isRequired,
    onImageClick: PropTypes.func.isRequired,
    onResizeEnd: PropTypes.func.isRequired,
};

export default Component;
