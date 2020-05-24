import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Resizable} from 're-resizable';
import AngleBlueDot from "./AngleBlueDot";
import Image from './Image';

const Wrapper = styled.div`
  position: relative;
`;

const handleStyles = {
    bottomRight: {
        width: 7,
        height: 7,
        bottom: -3,
        right: -3
    },
    topRight: {
        width: 7,
        height: 7,
        top: -3,
        right: -3
    },
    topLeft: {
        width: 7,
        height: 7,
        top: -3,
        left: -3
    },
    bottomLeft: {
        width: 7,
        height: 7,
        bottom: -3,
        left: -3
    },
};

function getEnable(enableToResize) {
    return {
        topRight: enableToResize,
        bottomRight: enableToResize,
        bottomLeft: enableToResize,
        topLeft: enableToResize
    }
}

function Component({enableToResize, src, title, width, height, setWidth, setHeight, onImageClick, onResizeEnd}) {
    const [dWidth, setDWidth] = useState(0);
    const [dHeight, setDHeight] = useState(0);

    const finalWidth = width + dWidth;
    const finalHeight = height + dHeight;

    return <Wrapper>
        <Resizable
            enable={getEnable(enableToResize)}
            lockAspectRatio={true}
            size={{
                width: finalWidth,
                height: finalHeight
            }}
            handleStyles={handleStyles}
            handleComponent={{
                topRight: <AngleBlueDot/>,
                bottomRight: <AngleBlueDot/>,
                bottomLeft: <AngleBlueDot/>,
                topLeft: <AngleBlueDot/>,
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
                width={finalWidth}
                height={finalHeight}
                src={src}
                title={title}
                onClick={e => {
                    e.stopPropagation();
                    onImageClick(e);
                }}
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
    onResizeEnd: PropTypes.func.isRequired,
    onImageClick: PropTypes.func.isRequired,
};

export default Component;
