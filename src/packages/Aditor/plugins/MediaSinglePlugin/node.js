import getJustifyContent from "./getJustifyContent";

export const name = 'mediaSingle';

export const LAYOUT_LEFT = 'left';
export const LAYOUT_CENTER = 'center';
export const LAYOUT_RIGHT = 'right';
export const LAYOUT_WRAP_LEFT = 'wrap-left';
export const LAYOUT_WRAP_RIGHT = 'wrap-right';

export const DEFAULT_LAYOUT = LAYOUT_LEFT;

function getFlexStyle(layout){
    return `display: flex; justify-content: ${getJustifyContent(layout)}`;
}

function getFloatStyle(layout){
    return `float: ${layout===LAYOUT_WRAP_LEFT ? "left": "right"}`;
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

export const node = {
    inline: false,
    group: 'block',
    selectable: true,
    content: 'inline*',
    atom: true,
    attrs: {
        layout: {default: DEFAULT_LAYOUT},
    },
    toDOM(node) {
        return ['div', {style: getStyle(node.attrs.layout)}, 0];
    }
}
