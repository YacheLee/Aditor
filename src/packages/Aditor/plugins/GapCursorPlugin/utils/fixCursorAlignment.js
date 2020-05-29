import GapCursorSelection from '../gapCursorSelection';
import Side from '../Side';
import { findDomRefAtPos, findPositionOfNodeBefore } from 'prosemirror-utils';
import isMediaSingle from './isMediaSingle';
import getDomNodeVerticalMargin from './getDomNodeVerticalMargin';
import isNodeViewWrapper from './isNodeViewWrapper';
import getBreakoutModeFromTargetNode from './getBreakoutModeFromTargetNode';
import { className } from '../styles';

function fixCursorAlignment(editorView) {
  const { state: { selection }, domAtPos, } = editorView;

  if (!(selection instanceof GapCursorSelection)) {
    return;
  }

  const { side, $from } = selection;

  // gap cursor is positioned relative to that node
  const targetNode = side === Side.LEFT ? $from.nodeAfter : $from.nodeBefore;
  if (!targetNode) {
    return;
  }
  const targetNodePos =
    side === Side.LEFT ? $from.pos + 1 : findPositionOfNodeBefore(selection);
  if (targetNodePos === undefined) {
    return;
  }

  let targetNodeRef = findDomRefAtPos(
    targetNodePos,
    domAtPos.bind(editorView),
  );

  const gapCursorRef = editorView.dom.querySelector(
    `.${className} span`,
  );

  if (!gapCursorRef) {
    return;
  }

  const gapCursorParentNodeRef = gapCursorRef.parentElement;
  if (!gapCursorParentNodeRef) {
    return;
  }

  const previousSibling = gapCursorParentNodeRef.previousSibling;
  const isTargetNodeMediaSingle = isMediaSingle(targetNodeRef);

  const isMediaWithWrapping =
    isTargetNodeMediaSingle &&
    /wrap-[right|left]/i.test(targetNode.attrs.layout);

  const prevNodeMarginBottom = getDomNodeVerticalMargin(
    previousSibling,
    'bottom',
  );

  const minHeight = 20;
  let height = 0;
  let width = 0;
  let marginTop = 0;
  let breakoutWidth = 0;
  let paddingLeft = 0;

  // gets width and height of the prevNode DOM element, or its nodeView wrapper DOM element
  do {
    if (!targetNodeRef) {
      break;
    }

    const isTargetNodeNodeViewWrapper = isNodeViewWrapper(targetNodeRef);
    const firstChild = targetNodeRef.firstElementChild;
    const css = window.getComputedStyle(
      isTargetNodeNodeViewWrapper && !isTargetNodeMediaSingle
        ? firstChild || targetNodeRef
        : targetNodeRef,
    );

    const isInTableCell =
      !!targetNodeRef.parentElement &&
      /td|th/i.test(targetNodeRef.parentElement.nodeName);

    height = parseInt(css.height, 10);
    width = parseInt(css.width, 10);

    width += parseInt(css.paddingLeft, 10);
    width += parseInt(css.paddingRight, 10);
    height += parseInt(css.paddingTop, 10);
    height += parseInt(css.paddingBottom, 10);

    // padding is cumulative
    paddingLeft += parseInt(css.paddingLeft, 10);

    if (previousSibling || isMediaWithWrapping || isInTableCell) {
      const curNodeMarginTop = getDomNodeVerticalMargin(targetNodeRef, 'top');
      if (curNodeMarginTop > prevNodeMarginBottom) {
        marginTop = curNodeMarginTop - prevNodeMarginBottom;
      }
      if (isMediaWithWrapping) {
        marginTop = curNodeMarginTop;
      }
    }

    if (isTargetNodeNodeViewWrapper || isTargetNodeMediaSingle) {
      breakoutWidth = width;
    }

    if (
      targetNodeRef.parentElement &&
      targetNodeRef.parentElement.classList.contains('ProseMirror')
    ) {
      break;
    }
    targetNodeRef = targetNodeRef.parentElement;
  } while (targetNodeRef && !targetNodeRef.contains(gapCursorRef));

  // height of the rule (<hr>) is 0, that's why we set minHeight
  if (height < minHeight) {
    height = minHeight;
    marginTop -= Math.round(minHeight / 2) - 1;
  }

  // breakout mode
  const breakoutMode = getBreakoutModeFromTargetNode(targetNode);
  const hasBreakoutEnable = /full-width|wide/i.test(breakoutMode);
  if (
    hasBreakoutEnable &&
    gapCursorRef.getAttribute('layout') !== breakoutMode
  ) {
    gapCursorRef.setAttribute('layout', breakoutMode);
  }

  // mediaSingle with layout="wrap-left" or "wrap-right"
  if (isMediaWithWrapping) {
    gapCursorParentNodeRef.setAttribute('layout', targetNode.attrs.layout);
    if (targetNode.attrs.layout === 'wrap-right') {
      gapCursorRef.style.marginLeft = `-${width}px`;
    }
  }

  gapCursorRef.style.height = `${height}px`;
  gapCursorRef.style.marginTop = `${marginTop}px`;
  gapCursorRef.style.width = `${breakoutWidth || width}px`;
}

export default fixCursorAlignment;