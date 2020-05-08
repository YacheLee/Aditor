import { Selector } from 'testcafe';
import { SELECTOR_EDITOR } from '../config';
import Utils from '../utils';

fixture `Getting Started`
  .page `http://localhost:9009/iframe.html?id=aditor--empty`;

test('As a user, I wanna type English so that I am able to see the English I typed.', async t => {
  const text = 'Hello world';

  await t.typeText(SELECTOR_EDITOR, text);
  await t.expect(await Utils.getData()).eql([{"type":"paragraph","content":[{"type":"text","text": text}]}]);
});
