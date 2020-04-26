import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {GREY_COLOR} from '../../../../config';
import types, {HEADING_DEFAULT_TYPE} from '../types';

const FONT_SIZE = 20;

const Root = styled.div`
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #f9f9f9;
  min-width: 100px;
  min-height: 200px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 9999999;
`;

const DropdownList = styled.div`
  color: black;
  padding: 8px 10px;
  height: 95%;
  text-decoration: none;
  display: block;

  &:hover {
    cursor: pointer;
    background-color: ${GREY_COLOR};
  }
`;

function Head({ fontSize, hover, onClick, label }) {
  return (
    <DropdownList hover={hover} style={{ fontSize }} onClick={onClick}>
      {label}
    </DropdownList>
  );
}

const HeadingList = ({ onClick, value }) => {
  return (
    <Root>
      {_.keys(types).map((level, index) => {
        const label = types[level];
        const hover = level === value;
        const fontSize = FONT_SIZE - 2 * index;

        return (
          <Head
            key={index}
            label={label}
            fontSize={fontSize}
            hover={hover}
            onClick={() => onClick(level)}
          />
        );
      })}
    </Root>
  );
};

HeadingList.defaultProps = {
  onClick: () => {},
  value: HEADING_DEFAULT_TYPE
};

HeadingList.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.oneOf(_.keys(types).map((e) => parseInt(e)))
};

export default HeadingList;
