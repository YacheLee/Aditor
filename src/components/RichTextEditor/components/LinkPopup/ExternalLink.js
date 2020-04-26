import React from 'react';
import {FaExternalLinkAlt} from "react-icons/fa";

const FONT_SIZE = 18;

function ExternalLink({url}){
    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt className="fas fa-external-link-alt" style={{fontSize: FONT_SIZE}} />
        </a>
    );
}

export default ExternalLink;
