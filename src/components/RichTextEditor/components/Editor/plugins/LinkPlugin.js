import React from 'react';
import {Plugin} from "prosemirror-state";
import {closestElement, getActiveLinkMark, removeLink, setLinkHref} from '../../../utils';
import {setAnchorEl, setPopoverContent} from '../Editor';
import LinkPopup from '../../LinkPopup';

const LinkPlugin = new Plugin({
    props: {
        handleClick: function (editorView, _pos, event) {
            const target = event.target;
            if (target) {
                const hyperlinkElement = closestElement(target, '.blockLink');
                if (hyperlinkElement) {
                    const activeLinkMark = getActiveLinkMark(editorView.state);
                    if(activeLinkMark){
                        const href = hyperlinkElement.getAttribute("href");
                        setPopoverContent(<LinkPopup url={href} onUnlinkClick={()=>{
                            removeLink(activeLinkMark.pos)(editorView.state, editorView.dispatch);
                            setAnchorEl(null);
                        }} onEditLinkClick={()=>{
                            const url = window.prompt('Enter the URL of the link:', href);
                            if (!url) return;
                            setLinkHref(url, activeLinkMark.pos)(editorView.state, editorView.dispatch);
                            setAnchorEl(null);
                        }} />);
                        setAnchorEl(hyperlinkElement);
                    }
                }
            }
            return false;
        }
    }
})

export default LinkPlugin;
