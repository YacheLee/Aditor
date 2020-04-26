import React from 'react';
import RichTextEditor from '../RichTextEditor';
import './App.css';

function App() {
    const [value, setValue] = React.useState([{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Heading1"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Heading2"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Heading3"}]},{"type":"heading","attrs":{"level":4},"content":[{"type":"text","text":"Heading4"}]},{"type":"heading","attrs":{"level":5},"content":[{"type":"text","text":"Heading5"}]},{"type":"heading","attrs":{"level":6},"content":[{"type":"text","text":"Heading6"}]},{"type":"paragraph","content":[{"type":"text","text":"Normal Text"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"strong"}],"text":"Bold"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"em"}],"text":"Italic"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"u"}],"text":"Underline"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"del"}],"text":"StrikeThrough"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"textColor","attrs":{"color":"#f44e3b"}}],"text":"Red"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"link","attrs":{"href":"https://www.google.com.tw","title":null}}],"text":"Link"}]},{"type":"heading","attrs":{"level":1},"content":[{"type":"text","marks":[{"type":"link","attrs":{"href":"https://www.google.com.tw","title":null}},{"type":"strong"},{"type":"em"},{"type":"u"},{"type":"del"},{"type":"textColor","attrs":{"color":"#f44e3b"}}],"text":"All combined"}]}]);

    return (
        <div className="App">
            <RichTextEditor defaultValue={value} onChange={value=>{
                setValue(value);
            }} />
            {JSON.stringify(value)}
        </div>
    );
}

App.defaultProps = {
};

App.propTypes = {
};

export default App;
