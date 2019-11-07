var { Router } = require('express');
var router = new Router();
var ProductRedis = require('../controllers/productRedis.controller');


// /api/user/
//router.get('/', ProductRedis.getAllProducts);
//router.get('/:id', ProductRedis.getOne);

router.post('/', ProductRedis.cache, ProductRedis.getRepos);
router.post('/predictiva/', ProductRedis.getListRedis);
module.exports = router;