import getJustifyContent from "./getJustifyContent";

export const name = 'mediaSingle';

export const DEFAULT_LAYOUT = 'left';

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
        const style = `display: flex; justify-content: ${getJustifyContent(node.attrs.layout)}`;
        return ['div', {style}, 0];
    }
}
