import React from 'react';
import copy from 'copy-to-clipboard';
import LinkPopover from './components/LinkPopover';
import setLinkHref from './setLinkHref';
import LinkEditPopover from './components/LinkEditPopover';
import setLinkText from './setLinkText';
import {DIALOG_ASK_URL} from './config';
import getActiveLinkMark from './getActiveLinkMark';
import PopoverManager from '../../PopoverManager';
import {isMobileView} from './utils';
import styles from './LinkPlugin.module.css';

function onLinkClick(editorView, _pos, event) {
  const { target } = event;
  if (target) {
    const hyperlinkElement = target.closest(`.${styles.blockLink}`);
    if (hyperlinkElement) {
      const mark = getActiveLinkMark(editorView.state);
      if (mark) {
        const url = hyperlinkElement.getAttribute('href');
        const text = hyperlinkElement.innerText;
        PopoverManager.setPopoverAnchorElement(hyperlinkElement);
        PopoverManager.setPopoverContent(
          <LinkPopover
            url={url}
            onEditLink={() => {
              if (isMobileView()) {
                const answeredUrl = window.prompt(DIALOG_ASK_URL, url);
                if (answeredUrl) {
                  setLinkHref(answeredUrl, mark.pos)(
                    editorView.state,
                    editorView.dispatch
                  );
                }
              } else {
                PopoverManager.setPopoverContent(
                  <LinkEditPopover
                    url={url}
                    text={text}
                    onApply={({ text, url }) => {
                      setLinkHref(url, mark.pos)(
                        editorView.state,
                        editorView.dispatch
                      );
                      setLinkText(text, mark.pos)(
                        editorView.state,
                        editorView.dispatch
                      );
                      PopoverManager.closePopover();
                    }}
                  />
                );
              }
            }}
            onCopyLink={() => {
              copy(url);
              PopoverManager.closePopover();
            }}
            onRemoveLink={() => {
              setLinkHref('', mark.pos)(editorView.state, editorView.dispatch);
              PopoverManager.closePopover();
            }}
          />
        );
      }
    }
  }
}

export default onLinkClick;
