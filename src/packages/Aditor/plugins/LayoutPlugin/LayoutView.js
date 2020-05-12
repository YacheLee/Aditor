import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from 'react-icons/ai';
import { getLayout, getMediaSingle, updateLayout } from '../MediaSinglePlugin/commands';
import LayoutToolbarButton from './LayoutToolbarButton';

class LayoutView {
  constructor(editorView, toolbarDom) {
    this.dom = document.createElement('div');
    this.dom.style.display = 'flex';
    this.renderReactComponent(editorView, toolbarDom);
  }

  renderReactComponent(editorView) {
    const mediaSingle = getMediaSingle(editorView);
    const layout = getLayout(mediaSingle);

    const arr = [
      {layout: "left", icon: AiOutlineAlignLeft},
      {layout: "center", icon: AiOutlineAlignCenter},
      {layout: "right", icon: AiOutlineAlignRight},
    ];

    const disabled = !mediaSingle;
    ReactDOM.render(
      <Fragment>
        {
          arr.map(({layout, icon}, index)=>{
            return <LayoutToolbarButton
              key={`LayoutToolbarButton_${index}`}
              Icon={icon}
              disabled={disabled}
              onClick={e=>{
                updateLayout({editorView, mediaSingle, layout});
              }}
            />
          })
        }
      </Fragment>
      ,
      this.dom
    );
  }

  update(editorView) {
    this.renderReactComponent(editorView);
  }

  destroy() {
    this.dom.remove();
  }
}

export default LayoutView;
