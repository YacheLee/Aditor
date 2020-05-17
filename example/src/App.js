import React from 'react';
import Aditor from 'aditor';
import JSONPretty from 'react-json-prettify';
import {github} from 'react-json-prettify/dist/themes';
import defaultValue from './data.json';
import 'aditor/dist/index.css';

const App = () => {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <div className="App">
      <Aditor id="aditor" defaultValue={value} onChange={value=>{
        setValue(value);
      }} />
      <JSONPretty json={value} theme={github} />
    </div>
  );
}

export default App
