import React, {Fragment, useContext} from 'react';
import {CompactPicker} from 'react-color';
import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';
import AButton from './AButton';
import {EditorViewContext} from '../../../contexts';
import {changeColor, getColor} from '../../../utils';
import CentralFlexbox from '../../../styles/CentralFlexbox';

const Root = styled(CentralFlexbox('div'))`
  &:hover {
    cursor: pointer;
  }
`;

function TextColorButton() {
  const { editorView } = useContext(EditorViewContext);
  const color = getColor(editorView);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Fragment>
      <Root>
        <AButton
          color={color}
          onClick={({ currentTarget }) => {
            setAnchorEl(currentTarget);
          }}
        />
      </Root>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <CompactPicker
          onChangeComplete={({ hex: value }) => {
            changeColor(
              editorView,
              value,
              editorView.state,
              editorView.dispatch
            );
            setAnchorEl(null);
          }}
        />
      </Popover>
    </Fragment>
  );
}

export default TextColorButton;
