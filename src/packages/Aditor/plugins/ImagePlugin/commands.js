import { key } from './ImagePlugin';

export function startImageUpload(event){
  //img.src = URL.createObjectURL(file);
  return (state, dispatch) => {
    const pluginState = key.getState(state);
    if (!pluginState.enabled) {
      return false;
    }

    if (dispatch) {
      dispatch(startUpload(event)(state.tr));
    }
    return true;
  };
}