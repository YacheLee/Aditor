import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Dot = styled.div`
  position: absolute;
  bottom: -1px;
  right: -4px;
  height: 9px;
  width: 9px;
  cursor: se-resize;
  background-color: rgb(26, 115, 232);
`;

export const MIN_SIZE = 20;
export const MAX_SIZE = 10000;

function clamp(min, value, max){
  return Math.min(Math.max(value, min), max);
}

function Component({imageRef, onResize, onResizeEnd}) {
  let isResizing = false, width, height;
  const dot = useRef(null);

  useEffect(() => {
    let fromX, fromY, toX, toY;

    function syncSize(e){
      toX = e.clientX;
      toY = e.clientY;
      const deltaX = toX - fromX;
      const rect = imageRef.current.getBoundingClientRect();

      const aspectRatio = rect.width / rect.height;

      width = clamp(MIN_SIZE, rect.width + Math.round(deltaX), MAX_SIZE);
      height = Math.max(width / aspectRatio, MIN_SIZE);
      width = height * aspectRatio;

      onResize({width, height});

      fromX = toX;
      fromY = toY;
    }

    function unbindEvents(){
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    }

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onMouseMove);
    window.addEventListener('touchend', onMouseUp);

    function onMouseDown(e){
      isResizing = true;
      fromX = e.clientX;
      fromY = e.clientY;
    }

    function onMouseMove(e){
      if (isResizing) {
        syncSize(e);
      }
    }

    function onMouseUp(e){
      if (!isResizing) {
        return;
      }
      syncSize(e);

      onResizeEnd({width, height});
      isResizing = false;

      unbindEvents();
    }

    return () => {
      unbindEvents();
    };
  }, []);
  return <Dot ref={dot} />
}

Component.propTypes = {
  onResize: PropTypes.func.isRequired,
  onResizeEnd: PropTypes.func.isRequired,
};

export default Component;
