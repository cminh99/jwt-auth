const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, (req, res) => {
  res.json({
    posts: {
      title: 'Posts title',
      content: 'Posts content'
    }
  });
});

module.exports = router;
