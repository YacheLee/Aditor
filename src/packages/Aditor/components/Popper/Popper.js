import React, { Fragment } from 'react';
import _Popper from '@material-ui/core/Popper';

const Popper = React.forwardRef(function Popper({ id, anchorEl, disablePortal=false, children}, ref){
  const open = document.body.contains(anchorEl) && Boolean(anchorEl);
  const zIndex = disablePortal ? 1 : 999;

  return (
    <_Popper
      ref={ref}
      id={id}
      open={open}
      anchorEl={anchorEl}
      disablePortal={disablePortal}
      style={{zIndex}}
    >
      <Fragment>{children}</Fragment>
    </_Popper>
  );
});

Popper.propTypes = {};

export default Popper;
