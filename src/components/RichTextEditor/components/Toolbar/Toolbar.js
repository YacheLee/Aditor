import React from 'react';
import styled from 'styled-components';
import BoldButton from './BoldButton';
import ItalicButton from './ItalicButton';
import UnderlineButton from './UnderlineButton';
import DelButton from './DelButton';
import TextColorButton from './TextColorButton';
import HeadingButton from './HeadingButton';
import LinkButton from './LinkButton';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import CentralFlexbox from '../../styles/CentralFlexbox';

const Root = styled.div`
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: auto;
    display: flex;
    flex: 0 0 auto;
    flex-shrink: 0;
    padding: 0;
`;

const Division = styled(CentralFlexbox('div'))`
    margin: 12px;
    width: auto;
    
    &:hover{
        cursor: pointer;
    }
`;

function Toolbar() {
    return (
        <Root onMouseDown={e=>e.preventDefault()}>
            <Division>
                <UndoButton />
            </Division>
            <Division>
                <RedoButton />
            </Division>
            <Division>
                <HeadingButton />
            </Division>
            <Division>
                <BoldButton />
            </Division>
            <Division>
                <ItalicButton />
            </Division>
            <Division>
                <UnderlineButton />
            </Division>
            <Division>
                <DelButton />
            </Division>
            <Division>
                <TextColorButton />
            </Division>
            <Division>
                <LinkButton />
            </Division>
        </Root>
    );
}

Toolbar.defaultProps = {
};

Toolbar.propTypes = {
};

export default Toolbar;
