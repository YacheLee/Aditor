import _ from "lodash";
import React, {useState} from 'react';
import styled from 'styled-components';
import _Paper from '@material-ui/core/Paper';

const Paper = styled(_Paper)`
  width: 462px;
  height: 146px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }
`;

const TextFieldContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    position: relative;
`;

const Label = styled.label`
    background-color: white;
    box-shadow: 5px 0 0 white, -5px 0 0 white;
    color: #5f6368;
    display: inline;
    font-size: 12px;
    left: 12px;
    margin-bottom: 0;
    max-width: 300px;
    padding: 0;
    position: absolute;
    top: 8px;
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
    
    &:focus{
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
    
    &:hover{
      border: 1px solid transparent;
      background-color: #2b7de9;
    }
`;

function LinkEditPopover({text: _text="", url: _url="", button_text="Apply", onApply}){
    const [text, setText] = useState(_text);
    const [url, setUrl] = useState(_url);
    const text_id = _.uniqueId('text_')
    const link_id = _.uniqueId('link_')

    return <Paper>
        <div className="wrapper">
            <TextFieldContainer>
                <Label htmlFor={text_id}>Text</Label>
                <TextField autoFocus={true} id={text_id} value={text} onChange={e=>setText(e.target.value)} />
            </TextFieldContainer>
            <TextFieldContainer>
                <Label htmlFor={link_id}>Link</Label>
                <TextField id={link_id} value={url} onChange={e=>setUrl(e.target.value)} />
                <Button onClick={()=>onApply({text, url})}>{button_text}</Button>
            </TextFieldContainer>
        </div>
    </Paper>
}

export default LinkEditPopover;
