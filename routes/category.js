const router = require('express').Router();
const CategoriesController = require('./../controllers/categories');
const auth = require('./../auth');

router.post('/', auth.verify,  CategoriesController.addTransaction)

router.get('/', CategoriesController.getAll)

module.exports = router;