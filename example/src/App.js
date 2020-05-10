import React from 'react';
import Aditor from 'aditor';
import defaultValue from './data.json';
import 'aditor/dist/index.css';

const App = () => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="App">
      <Aditor id="aditor" defaultValue={value} onChange={value=>{
        setValue(value);
      }} />
      {JSON.stringify(value)}
    </div>
  );
}

export default App
