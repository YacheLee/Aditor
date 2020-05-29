import { PluginKey } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import bindKeymapWithCommand from '../bindKeymapWithCommand';
import { moveLeft, moveRight } from '../keymaps';
import Direction from '../Direction';
import arrow from '../arrow';

export const key = new PluginKey('GapCursorKeymapPlugin');

function MyPlugin() {
  const map = {};

  bindKeymapWithCommand(
    moveLeft.common,
    (state, dispatch, editorView) => {
        const endOfTextBlock = editorView ? editorView.endOfTextblock.bind(editorView) : undefined;
        return arrow(Direction.LEFT, endOfTextBlock)(state, dispatch, editorView);
      },
      map,
  );

  bindKeymapWithCommand(
    moveRight.common,
    (state, dispatch, view) => {
        const endOfTextBlock = view ? view.endOfTextblock.bind(view) : undefined;
        return arrow(Direction.RIGHT, endOfTextBlock)(state, dispatch);
      },
      map,
  );

  return keymap(map);
}

export default MyPlugin;
