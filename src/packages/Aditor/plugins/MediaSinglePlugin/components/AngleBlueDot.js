import React from 'react';
import styled from 'styled-components';

export const className = 'dragging-dot';

const AngleBlueDot = styled.div`
  background-color: rgb(26, 115, 232);
  border-radius: 2px;  
  border: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

function Component(){
    return <AngleBlueDot className={className} />
}

Component.propTypes = {
};

export default Component;
