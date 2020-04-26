import React, {Fragment, useContext} from 'react';
import Popover from '@material-ui/core/Popover';
import styled from 'styled-components';
import {MdArrowDropDown} from "react-icons/md";
import HeadingList from "./HeadingList";
import {BLACK_COLOR} from '../../../config';
import {EditorViewContext} from '../../../contexts';
import {changeHeading, getHeading} from '../../../utils';
import types from './types';
import CentralFlexbox from '../../../styles/CentralFlexbox';

const Root = styled(CentralFlexbox("div"))`
  color: ${BLACK_COLOR};
  &:hover{
    cursor: pointer;
`;

const Center = CentralFlexbox("span");

function HeadingButton(){
    const {editorView} = useContext(EditorViewContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const value = getHeading(editorView);
    const label = types[value];

    return <Fragment>
        <Root onClick={({currentTarget}) => {
            setAnchorEl(currentTarget);
        }}>
            <Center>{label}</Center>
            <Center><MdArrowDropDown /></Center>
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
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <div>
                <HeadingList value={value} onClick={(level) => {
                    changeHeading(editorView, parseInt(level));
                    setAnchorEl(null);
                }} />
            </div>
        </Popover>
    </Fragment>;
}

HeadingButton.defaultProps = {
};

HeadingButton.propTypes = {
};

export default HeadingButton;
