import { PluginKey } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import bindKeymapWithCommand from '../bindKeymapWithCommand';
import { moveDown, moveLeft, moveRight, moveUp } from '../keymaps';
import Direction from '../Direction';
import arrow from '../arrow';

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
  })

  return keymap(map);
}

export default MyPlugin;
