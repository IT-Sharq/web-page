const Scene = require('telegraf/scenes/base');
const meny = require('../buttons/meny');
const fs = require('fs');
const path = require('path');
const PostModel = require('../../db/models/post.model');
const newPost = new Scene('New_Post');

newPost.hears('🔙', async (ctx) => {
  try {
    await ctx.reply('Меню', meny());
    console.log(ctx.session.photo);
    await ctx.scene.leave();
  } catch (error) {
    console.log(error);
  }
});
newPost.enter((ctx) => {
  // console.log(ctx.state);
});
newPost.on('message', async (ctx) => {
  console.log(ctx.state);
  if (!ctx.session.photo) {
    try {
      ctx.reply('Ждите');
      const photo = ctx.message.document;
      const fileId = photo.file_id;
      const file = await ctx.telegram.getFile(fileId);
      const fileUrl = `https://api.telegram.org/file/${process.env.TOKEN}/${file.file_path}`;
      const uniqueFilename = `${Date.now()}_${file.file_path.split('/').pop()}`;
      const savePath = path.join(
        __dirname,
        '../../assets/images/post_images/' + uniqueFilename
      );
      const response = await fetch(fileUrl);
      console.log(response);
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(savePath, Buffer.from(buffer));
      ctx.reply(
        '✅Фотография успешно сохранена.\n🖊Пишите Названия,текст поста'
      );
      ctx.session.photo = uniqueFilename;
    } catch (error) {
      console.error('Произошла ошибка при обработке фотографии:', error);
      ctx.reply('Произошла ошибка при обработке фотографии.');
    }
  } else {
    try {
      const text = ctx.message.text.split('~');
      if (text.length !== 2 || !ctx.session.photo)
        return ctx.reply('ошибка в структру');
      const postModel = await PostModel.create({
        name: text[0],
        photo: ctx.session.photo,
        text: text[1],
      });
      ctx.session.photo = false;

      ctx.reply('✅Пост Добавлен!\nОтправьте фото');
    } catch (error) {
      console.log(error);
    }
  }
});

const dellPost = new Scene('Dell_Post');
dellPost.hears('🔙', async (ctx) => {
  try {
    await ctx.reply('Меню', meny());
    await ctx.scene.leave();
  } catch (error) {
    console.log(error);
  }
});
dellPost.enter((ctx) => ctx.reply('Введите ID'));
dellPost.on('message', async (ctx) => {
  try {
    const IdToDelete = +ctx.message.text;
    if (isNaN(IdToDelete)) return ctx.reply('ID Должен быть числом');
    const deletedRows = await PostModel.destroy({
      where: {
        id: IdToDelete,
      },
    });

    if (deletedRows === 1) {
      ctx.reply(`Запись с id ${IdToDelete} успешно удалена.`);
    } else {
      ctx.reply(`Запись с id ${IdToDelete} не найдена.`);
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = [newPost, dellPost];
