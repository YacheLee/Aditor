import React from 'react';
import {MdInsertLink} from 'react-icons/md';
import ToolbarButtonStyle from '../../../shared/ToolbarButtonStyle';
import LinkEditPopover from '../LinkEditPopover';
import insertLink from './insertLink';
import PopoverManager from '../../../../PopoverManager';
import setLinkHref from '../../setLinkHref';
import setLinkText from '../../setLinkText';
import {isMobileView} from '../../utils';
import {DIALOG_ASK_TEXT, DIALOG_ASK_URL} from '../../config';

function getSelectedText(state, from, to) {
  const selectedNode = state.doc.cut(from, to);
  const selectedFragment = selectedNode.content;

  return selectedFragment.content.map((e) => e.textContent).join('');
}

function getSelectedLink(state, pos) {
  const node = state.doc.nodeAt(pos);
  const { link } = state.schema.marks;
  const mark = link.isInSet(node.marks);
  if (mark && mark.attrs) {
    return mark.attrs.href;
  }
  return '';
}

function LinkToolbarButton({ editorView, toolbarButtonDom }) {
  return (
    <ToolbarButtonStyle
      onClick={(event) => {
        event.preventDefault();

        // toggle
        if (PopoverManager.getAnchorEl() === toolbarButtonDom) {
          PopoverManager.closePopover();
        } else {
          let text = '';
          let url = '';
          const { from, to } = editorView.state.selection;
          const isInsertMode = from === to;
          if (!isInsertMode) {
            text = getSelectedText(editorView.state, from, to);
            url = getSelectedLink(editorView.state, from);
          }

          const buttonText = isInsertMode ? 'Insert' : 'Update';

          if (isMobileView()) {
            if (isInsertMode) {
              const answeredText = window.prompt(DIALOG_ASK_TEXT, text);
              if (answeredText) {
                const answeredUrl = window.prompt(DIALOG_ASK_URL, url);
                if (answeredUrl) {
                  insertLink(
                    from,
                    answeredUrl,
                    answeredText
                  )(editorView.state, editorView.dispatch);
                }
              }
            } else {
              const answeredUrl = window.prompt(DIALOG_ASK_URL, url);
              if (answeredUrl) {
                setLinkHref(
                  answeredUrl,
                  from,
                  to
                )(editorView.state, editorView.dispatch);
              }
            }
          } else {
            PopoverManager.setPopoverAnchorElement(toolbarButtonDom);
            PopoverManager.setPopoverContent(
              <LinkEditPopover
                text={text}
                url={url}
                button_text={buttonText}
                onApply={({ text, url }) => {
                  if (isInsertMode) {
                    insertLink(
                      from,
                      url,
                      text
                    )(editorView.state, editorView.dispatch);
                  } else {
                    setLinkHref(
                      url,
                      from,
                      to
                    )(editorView.state, editorView.dispatch);
                    setLinkText(
                      text,
                      from,
                      to
                    )(editorView.state, editorView.dispatch);
                  }
                  PopoverManager.closePopover();
                }}
              />
            );
          }
        }
      }}
    >
      <MdInsertLink />
    </ToolbarButtonStyle>
  );
}

export default LinkToolbarButton;
