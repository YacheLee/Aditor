import React, { Fragment } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PopoverManager from '../../PopoverManager';
import useEscClose from './useEscClose';
import Popper from '../Popper';

function PopoverWithClickAway({ id, anchorEl, children }) {
  useEscClose();

  return (
    <ClickAwayListener
      onClickAway={(event) => {
        if (event.composedPath().indexOf(anchorEl) === -1) {
          PopoverManager.closePopover();
        }
      }}
    >
      <Popper id={id} anchorEl={anchorEl}>
        <Fragment>{children}</Fragment>
      </Popper>
    </ClickAwayListener>
  );
}

PopoverWithClickAway.propTypes = {};

export default PopoverWithClickAway;
