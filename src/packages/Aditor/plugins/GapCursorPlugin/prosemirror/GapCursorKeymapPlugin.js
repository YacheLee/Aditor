import { PluginKey } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import bindKeymapWithCommand from '../bindKeymapWithCommand';
import { backspace, deleteKey, moveDown, moveLeft, moveRight, moveUp } from '../keymaps';
import Direction from '../Direction';
import arrow from '../arrow';
import deleteNode from '../utils/deleteNode';

export const key = new PluginKey('GapCursorKeymapPlugin');

function MyPlugin() {
  const map = {};

  const keys = [
    {
      key: moveUp,
      direction: Direction.UP
    },
    {
      key: moveDown,
      direction: Direction.DOWN
    },
    {
      key: moveLeft,
      direction: Direction.LEFT
    },
    {
      key: moveRight,
      direction: Direction.RIGHT
    }];

  keys.forEach(({key, direction})=>{
    bindKeymapWithCommand(
      key.common,
      (state, dispatch, editorView) => {
        const endOfTextBlock = editorView ? editorView.endOfTextblock.bind(editorView) : undefined;
        return arrow(direction, endOfTextBlock)(state, dispatch, editorView);
      },
      map,
    );
  });

  //if the current cursor is gap cursor, and press whitespace, we need to enter to the next line
  bindKeymapWithCommand(
    backspace.common,
    deleteNode(Direction.BACKWARD),
    map,
  );

  bindKeymapWithCommand(
    deleteKey.common,
    deleteNode(Direction.FORWARD),
    map,
  );

  return keymap(map);
}

export default MyPlugin;
