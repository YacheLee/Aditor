import {DIALOG_MOBILE_SIZE} from './config';

export function isMobileView(){
    return window.screen.width < DIALOG_MOBILE_SIZE;
}
