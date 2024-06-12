const { Markup } = require('telegraf');

const KeyboardBack = (typeKeybord) => {
  return {
    reply_markup: Markup.keyboard(['🔙']).resize(),
  };
};
module.exports = KeyboardBack;
