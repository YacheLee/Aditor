import getJustifyContent from './getJustifyContent';
import { LAYOUT_CENTER, LAYOUT_LEFT, LAYOUT_RIGHT, LAYOUT_WRAP_LEFT, LAYOUT_WRAP_RIGHT } from './node';
import { DEFAULT_LAYOUT } from './index';

function getFlexStyle(layout){
  return {
    display: "flex",
    justifyContent: getJustifyContent(layout)
  }
}

function getFloatStyle(layout){
  return {
    float: layout===LAYOUT_WRAP_LEFT ? "left": "right"
  };
}

function getStyle(layout=DEFAULT_LAYOUT){

  switch(layout){
    case LAYOUT_WRAP_LEFT:
    case LAYOUT_WRAP_RIGHT:
      return getFloatStyle(layout);
    case LAYOUT_LEFT:
    case LAYOUT_CENTER:
    case LAYOUT_RIGHT:
    default:
      return getFlexStyle(layout);
  }
}

export default getStyle;
