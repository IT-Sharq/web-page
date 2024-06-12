const { Router } = require('express');
const post = require('./post.router');

const router = Router();
router.use('/posts', post);

module.exports = router;
