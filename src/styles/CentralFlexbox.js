import styled from 'styled-components';

function CentralFlexbox(tag) {
  return styled(tag)`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
}

CentralFlexbox.defaultProps = {};

CentralFlexbox.propTypes = {};

export default CentralFlexbox;
