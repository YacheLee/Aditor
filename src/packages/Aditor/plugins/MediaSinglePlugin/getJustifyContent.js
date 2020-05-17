import { DEFAULT_LAYOUT } from './index';

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

export default getJustifyContent;
