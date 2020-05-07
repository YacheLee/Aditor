import React from 'react';
import Aditor from '../packages/Aditor';
import Component from './Component';

export default {
  title: 'Aditor'
};

export const Empty = () => {
  return <Component defaultValue={[]} />
};
