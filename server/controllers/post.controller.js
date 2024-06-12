const Sequelize = require('sequelize');
const PostModel = require('../../db/models/post.model');
const fs = require('fs');
const path = require('path');
const Op = Sequelize.Op;

class PostController {
  async getThreePosts(req, res, next) {
    const lastThreePosts = await PostModel.findAll({
      order: [['id', 'DESC']],
      limit: 3,
    });
    console.log(lastThreePosts);
    return res.json(lastThreePosts);
  }

  async getAllPosts(req, res, next) {
    const lastThreePosts = await PostModel.findAll({
      order: [['id', 'DESC']],
    });
    console.log(lastThreePosts);
    return res.json(lastThreePosts);
  }
  async getOnePostPage(req, res) {
    try {
      const { idPost } = req.query;
      console.log('hello');

      const stream = fs.createReadStream(
        path.join(__dirname, '../pages/onePost.html')
      );
      res.setHeader('Content-Type', 'text/html');
      stream.pipe(res);
    } catch (error) {
      console.log(error);
    }
  }

  async getOnePost(req, res) {
    try {
      const { idPost } = req.query;
      if (isNaN(+idPost)) return res.status(401).send('неверный данный');
      const onePost = await PostModel.findOne({ where: { id: +idPost } });
      if (!onePost) return res.status(404).send('Страница не найдена');
      return res.json(onePost);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PostController();
