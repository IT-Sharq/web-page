const { Markup } = require('telegraf');

const keyboardUser = Markup.keyboard([
  ['✏️ Новый пост', '❌ Удалить пост'],
]).resize();

module.exports = (typeKeybord) => {
  return {
    reply_markup: keyboardUser,
  };
};
