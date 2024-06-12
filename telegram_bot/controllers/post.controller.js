const KeyboardBack = require('../buttons/backButton');
const meny = require('../buttons/meny');
const PostModel = require('../../db/models/post.model');

class PostControllers {
  async newPost(ctx) {
    try {
      ctx.session.photo = false;
      ctx.reply('Отправитье фото', KeyboardBack());
      ctx.scene.enter('New_Post');
    } catch (error) {
      console.log(error);
    }
  }
  async dellPost(ctx) {
    try {
      let text = '';
      const postModel = await PostModel.findAll({ attributes: ['name', 'id'] });

      postModel.forEach(
        ({ id, name }) => (text += `<b>${id}</b> - ${name}\n `)
      );
      ctx.replyWithHTML(text, KeyboardBack());
      ctx.scene.enter('Dell_Post');
    } catch (error) {
      console.log(error);
    }
  }

  async buckButton(ctx) {
    try {
      await ctx.reply('Меню', meny());
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new PostControllers();
