//source is from https://gist.github.com/rgrove/5463265

/**
 Returns a bounding rect for _el_ with absolute coordinates corrected for
 scroll positions.
 The native `getBoundingClientRect()` returns coordinates for an element's
 visual position relative to the top left of the viewport, so if the element
 is part of a scrollable region that has been scrolled, its coordinates will
 be different than if the region hadn't been scrolled.
 This method corrects for scroll offsets all the way up the node tree, so the
 returned bounding rect will represent an absolute position on a virtual
 canvas, regardless of scrolling.
 @method getAbsoluteBoundingRect
 @param {HTMLElement} el HTML element.
 @return {Object} Absolute bounding rect for _el_.
 **/

function getAbsoluteBoundingRect (el) {
  var doc  = document,
    win  = window,
    body = doc.body,

    // pageXOffset and pageYOffset work everywhere except IE <9.
    offsetX = win.pageXOffset !== undefined ? win.pageXOffset :
      (doc.documentElement || body.parentNode || body).scrollLeft,
    offsetY = win.pageYOffset !== undefined ? win.pageYOffset :
      (doc.documentElement || body.parentNode || body).scrollTop,

    rect = el.getBoundingClientRect();

  if (el !== body) {
    var parent = el.parentNode;

    // The element's rect will be affected by the scroll positions of
    // *all* of its scrollable parents, not just the window, so we have
    // to walk up the tree and collect every scroll offset. Good times.
    while (parent !== body) {
      offsetX += parent.scrollLeft;
      offsetY += parent.scrollTop;
      parent   = parent.parentNode;
    }
  }

  return {
    bottom: rect.bottom + offsetY,
    height: rect.height,
    left  : rect.left + offsetX,
    right : rect.right + offsetX,
    top   : rect.top + offsetY,
    width : rect.width
  };
}

export default getAbsoluteBoundingRect;
