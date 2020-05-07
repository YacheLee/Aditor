import { Selector } from 'testcafe';

fixture `Getting Started`
  .page `http://localhost:9009/iframe.html?id=aditor--empty`;

test('As a user, I wanna type English so that I am able to see the English I typed.', async t => {
  const EDITOR = `.ProseMirror`;
  const text = 'Hello world';

  await t.typeText(EDITOR, text);

  const data = await Selector('[test_id=aditor-state]').innerText;
  await t.expect(JSON.parse(data)).eql([{"type":"paragraph","content":[{"type":"text","text": text}]}]);
});
