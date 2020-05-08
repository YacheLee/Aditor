import React from 'react';
import Aditor from '../packages/Aditor';

export default function Component({ defaultValue }) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className='App'>
      <Aditor
        id='aditor'
        defaultValue={value}
        onChange={(value) => {
          setValue(value);
        }}
      />
      <div test_id='aditor-state'>{JSON.stringify(value)}</div>
    </div>
  );
}
