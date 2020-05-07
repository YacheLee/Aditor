import React from 'react';
import Component from './Component';

export default {
  title: 'Aditor'
};

export const Empty = () => {
  return <Component defaultValue={[]} />
};
