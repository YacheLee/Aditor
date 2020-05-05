const PopoverManager = {
  editorView: null,
  anchorEl: null,
  setPopoverAnchorElement: null,
  setPopoverContent: null,

  setEditorView: function (editorView) {
    this.editorView = editorView;
  },
  setAnchorEl: function (anchorEl) {
    this.anchorEl = anchorEl;
  },
  getAnchorEl: function () {
    return this.anchorEl;
  },
  closePopover: function () {
    this.setPopoverAnchorElement(null);
    this.editorView.focus();
  },
  isTopPopover: function () {
    return this.anchorEl !== null;
  }
};

export default PopoverManager;
