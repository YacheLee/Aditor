import React from 'react';

const FONT_SIZE = 18;

const EditLink = ({ onClick, ...props }) => {
  return (
    <div style={{ fontSize: FONT_SIZE }} onClick={onClick}>
      Edit Link
    </div>
  );
};

export default EditLink;
