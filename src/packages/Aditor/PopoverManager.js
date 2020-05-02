const PopoverManager = {
    anchorEl: null,
    setPopoverAnchorElement: null,
    setPopoverContent: null,
    setAnchorEl: function(anchorEl){
        this.anchorEl = anchorEl;
    },
    getAnchorEl: function(){
        return this.anchorEl;
    },
    closePopover: function(){
        this.setPopoverAnchorElement(null);
    },
    isTopPopover: function(){
        return this.anchorEl!==null;
    }
}

export default PopoverManager;
