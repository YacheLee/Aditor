import {className as draggingDotClassName} from "./components/AngleBlueDot";

function isMouseDownEventFromResize(e){
    const {path=[]} = e.nativeEvent;
    for(const p of path){
        if(p.classList && p.classList.contains(draggingDotClassName)){
            return true;
        }
    }
    return false;
}

export default isMouseDownEventFromResize;
