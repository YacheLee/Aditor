import { css, keyframes } from 'styled-components';

export const className = "ProseMirror-gapcursor"
export const gapCursor = `.${className}`;

const blinkKeyFrames = keyframes`
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

export const gapCursorStyles = css`
  /* =============== GAP CURSOR ================== */
  .ProseMirror {
    &.ProseMirror-focused ${gapCursor} {
      display: block;
      border: solid 1px red;
      pointer-events: none;
    }
    
    ${gapCursor} {
      position: absolute;
      display: none;
      pointer-events: none;
      animation: 1s ${blinkKeyFrames} step-end infinite;
      
      //caret color is to hide the default cursor
      caret-color: transparent;
    }
  }
`;
