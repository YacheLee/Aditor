import React from 'react';
import styled from 'styled-components';
import ExternalLink from './ExternalLink';
import Unlink from './Unlink';
import {GREY_COLOR} from '../../config';
import ButtonStyle from './ButtonStyle';
import EditLink from './EditLink';

const Root = styled.div`
  overflow-y: hidden;
  display: inline-flex;
  height: 30px;
  width: 180px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 4px 8px;
  z-index: 10;

  &:hover {
    cursor: pointer;
  }

  a {
    color: #0052cc;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: #3b73af;
    }
  }
`;

const Separator = styled.div`
  display: flex;
  background: ${GREY_COLOR};
  width: 1px;
  height: 28px;
  margin: 0 8px;
`;

function LinkPopup({ url, onEditLinkClick, onUnlinkClick }) {
  return (
    <Root>
      <ButtonStyle>
        <EditLink onClick={onEditLinkClick} />
      </ButtonStyle>
      <Separator />
      <ButtonStyle>
        <ExternalLink url={url} />
      </ButtonStyle>
      <Separator />
      <ButtonStyle>
        <Unlink onClick={onUnlinkClick} />
      </ButtonStyle>
    </Root>
  );
}

export default LinkPopup;
