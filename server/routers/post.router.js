const Router = require('express');
const PostController = require('../controllers/post.controller');

const router = Router();
router.get('/getThree', PostController.getThreePosts);
router.get('/getAll', PostController.getAllPosts);
router.get('/getOnePost', PostController.getOnePost);
module.exports = router;
