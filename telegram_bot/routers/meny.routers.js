const RouterGenerate = require('../utils/routerGenerate');

const router = new RouterGenerate();

const postControllers = require('../controllers/post.controller');
router.addRout('✏️ Новый пост', postControllers.newPost);
router.addRout('❌ Удалить пост', postControllers.dellPost);

router.addRout('🔙', postControllers.buckButton);
module.exports = router;
