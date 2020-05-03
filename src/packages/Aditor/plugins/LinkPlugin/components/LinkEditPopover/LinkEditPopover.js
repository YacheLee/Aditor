import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import _Paper from '@material-ui/core/Paper';

const Paper = styled(_Paper)`
  width: 462px;
  height: 146px;
  position: relative;
`;

const TextFieldContainer = styled.div`
  height: 50%;
  position: relative;
  padding: 24px;
`;

const TextFieldInner = styled.div`
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  top: -8px;
  left: 12px;

  background-color: white;
  box-shadow: 5px 0 0 white, -5px 0 0 white;
  color: #5f6368;
  display: inline;
  font-size: 12px;
  margin-bottom: 0;
  max-width: 300px;
  padding: 0;
`;

const TextField = styled.input`
  box-sizing: content-box;
  color: #5f6368;
  height: 32px;
  margin: 0;
  width: 294px;

  border: 1px solid #dadce0;
  border-radius: 4px;
  padding: 1px 8px;
  font-size: 14px;

  &:focus {
    color: #3c4043;
    border: 2px solid #1a73e8;
    box-shadow: none;
    padding: 0 7px;
    outline: none;
  }
`;

const Button = styled.div`
  user-select: none;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  box-sizing: border-box;

  font-weight: 500;
  font-size: 14px;
  height: 36px;
  letter-spacing: 0.25px;
  line-height: 16px;
  padding: 9px 24px 11px 24px;
  background: #1a73e8 none;
  color: #fff;

  margin-left: 12px;

  &:hover {
    border: 1px solid transparent;
    background-color: #2b7de9;
  }
`;

function LinkEditPopover({
  text: _text = '',
  url: _url = '',
  buttonText = 'Apply',
  onApply
}) {
  const [text, setText] = useState(_text);
  const [url, setUrl] = useState(_url);
  const textId = _.uniqueId('text_');
  const linkId = _.uniqueId('link_');

  return (
    <Paper>
      <TextFieldContainer>
        <TextFieldInner>
          <Label htmlFor={textId}>Text</Label>
          <TextField
            autoFocus
            id={textId}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </TextFieldInner>
      </TextFieldContainer>
      <TextFieldContainer style={{ paddingTop: 12 }}>
        <TextFieldInner style={{ display: 'flex' }}>
          <Label htmlFor={linkId}>Link</Label>
          <TextField
            id={linkId}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={() => onApply({ text, url })}>{buttonText}</Button>
        </TextFieldInner>
      </TextFieldContainer>
    </Paper>
  );
}

export default LinkEditPopover;
