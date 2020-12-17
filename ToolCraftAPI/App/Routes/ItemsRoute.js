// Router

// Modules Dependencies
const _express = require('express');
const _itemsController = require('../Controllers/ItemsController');

const router = _express.Router();

router.get('/get/initial', _itemsController.GetInitialItems);

router.get('/get/dismantle/:id', _itemsController.DismantleItem);

router.get('/get/:id/:quantity?', _itemsController.GetItem);


module.exports = router;