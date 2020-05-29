export const moveLeft = makeKeyMapWithCommon('Move left', 'ArrowLeft');
export const moveRight = makeKeyMapWithCommon('Move right', 'ArrowRight');

function makeKeyMapWithCommon(description, common){
  const windows = common.replace(/Mod/i, 'Ctrl');
  const mac = common.replace(/Mod/i, 'Cmd');
  return makeKeymap(description, windows, mac, common);
}

function makeKeymap(description, windows, mac, common,){
  return { description, windows, mac, common };
}