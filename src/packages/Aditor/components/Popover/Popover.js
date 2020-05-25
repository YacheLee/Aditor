import React, {Fragment} from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PopoverManager from '../../PopoverManager';
import useEscClose from './useEscClose';

function Popover({ id, anchorEl, children }) {
  const open = document.body.contains(anchorEl) && Boolean(anchorEl);
  useEscClose();

  return (
    <ClickAwayListener
      onClickAway={(event) => {
        if (event.composedPath().indexOf(anchorEl) === -1) {
          PopoverManager.closePopover();
        }
      }}
    >
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        disablePortal={true}
        style={{zIndex: 1}}
        onClose={PopoverManager.closePopover}
      >
        <Fragment>{children}</Fragment>
      </Popper>
    </ClickAwayListener>
  );
}

Popover.propTypes = {};

export default Popover;
