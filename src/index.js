import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import EditorViewContext from './contexts/EditorViewContext';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import normaliseValue from './normaliseValue';

const PaperWrapper = styled(Paper)`
  padding: 12px;
`;

function Aditor({ defaultValue, onChange }) {
  const [editorView, setEditorView] = useState(null);

  return (
    <EditorViewContext.Provider value={{ editorView, setEditorView }}>
      <PaperWrapper elevation={3}>
        {editorView && <Toolbar />}
        <Divider light />
        <div style={{ margin: 12, overflow: 'auto' }}>
          <Editor value={normaliseValue(defaultValue)} onChange={onChange} />
        </div>
      </PaperWrapper>
    </EditorViewContext.Provider>
  );
}

Aditor.defaultProps = {
  defaultValue: [],
  onChange: () => {}
};

Aditor.propTypes = {
  defaultValue: PropTypes.array,
  onChange: PropTypes.func
};

export default Aditor;
