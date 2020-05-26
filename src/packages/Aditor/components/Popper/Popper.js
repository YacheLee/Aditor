import React, { Fragment } from 'react';
import _Popper from '@material-ui/core/Popper';

const Popper = React.forwardRef(function Popper({ id, anchorEl, children}, ref){
  const open = document.body.contains(anchorEl) && Boolean(anchorEl);

  return (
    <_Popper
      ref={ref}
      id={id}
      open={open}
      anchorEl={anchorEl}
      disablePortal={true}
      style={{zIndex: 1}}
    >
      <Fragment>{children}</Fragment>
    </_Popper>
  );
});

Popper.propTypes = {};

export default Popper;
