import React from 'react';
import {FaUnlink} from 'react-icons/fa';

const FONT_SIZE = 18;

const Unlink = ({onClick}) => {
    return (
        <div onClick={onClick}>
            <FaUnlink style={{fontSize: FONT_SIZE}} />
        </div>
    );
};

export default Unlink;
