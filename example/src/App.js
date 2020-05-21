import _ from "lodash";
import React from 'react';
import Aditor from 'aditor';
import JSONPretty from 'react-json-prettify';
import {github} from 'react-json-prettify/dist/themes';
import defaultValue from './data.json';
import 'aditor/dist/index.css';

const App = () => {
  const [value, setValue] = React.useState(defaultValue);
    const [selection, setSelection] = React.useState({});

  return (
    <div className="App">
        <div className="left">
            <Aditor
                id="aditor"
                defaultValue={value}
                onChange={_.debounce(setValue, 500)}
                onSelect={setSelection}
            />
        </div>
        <div className="right">
            <div>
                Selection
                <JSONPretty json={selection} theme={github} />
            </div>
            <div>
                Data
                <JSONPretty json={value} theme={github} />
            </div>
        </div>
    </div>
  );
}

export default App
