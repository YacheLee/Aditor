function bindKeymapWithCommand(shortcut, cmd, keymap,) {
  const oldCmd = keymap[shortcut];
  let newCmd = cmd;
  if (keymap[shortcut]) {
    newCmd = (state, dispatch, editorView) => {
      return oldCmd(state, dispatch) || cmd(state, dispatch, editorView);
    };
  }
  keymap[shortcut] = newCmd;
}

export default bindKeymapWithCommand;