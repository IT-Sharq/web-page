const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

const sequelize = require('./db/db');
const PostModel = require('./db/models/post.model');

const { Telegraf, Markup, Stage } = require('telegraf');
const session = require('telegraf/session');
const bot = new Telegraf(process.env.BOT_TOKEN);
const routers = require('./server/routers/index');
const addPegas = require('./pages/pages_add');
const meny = require('./telegram_bot/buttons/meny');
const routersBot = require('./telegram_bot/routers/index');
const scenesButtons = require('./telegram_bot/scens/post.scen.js');
const postController = require('./server/controllers/post.controller');

app.use('/vendor', express.static(path.join(__dirname, '/vendor')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));

bot.use(session());

const stage = new Stage();
const { leave } = Stage;
stage.command('cancel', leave());
bot.use(stage.middleware());
scenesButtons.forEach((rpl) => stage.register(rpl));
bot.start(async (ctx) => ctx.reply('Welcome1', meny()));
bot.help((ctx) => ctx.reply('Send me a sticker'));
console.log(stage);
routersBot.forEach(({ routs }) => {
  for (let [uri, fn] of Object.entries(routs)) {
    bot.hears(uri, fn);
  }
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.use('/api', routers);
    app.get('/', (req, res) => {
      const stream = fs.createReadStream(__dirname + '/index.html');
      res.setHeader('Content-Type', 'text/html');
      stream.pipe(res);
    });
    app.get('/onepost', postController.getOnePostPage);
    addPegas(app);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });

    await bot.startPolling();
  } catch (error) {
    console.log('Ошибка Index.js', error);
  }
};
start();
