var { Router } = require('express');
var router = new Router();
var ProductRedis = require('../controllers/productRedis.controller');


// /api/user/
//router.get('/', ProductRedis.getAllProducts);
//router.get('/:id', ProductRedis.getOne);

router.get('/:name', ProductRedis.cache, ProductRedis.getRepos);
router.get('/predictiva/:name', ProductRedis.getListRedis);
module.exports = router;