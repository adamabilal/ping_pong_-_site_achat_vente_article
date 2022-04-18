const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentication.middleware');

// import controller for index
const userController = require('../controllers/user.controller');

router.get('/', userController.home );
router.get('/me', authMiddleware.validToken, userController.me );
router.put('/me', authMiddleware.validToken, userController.update );

const controller = require('../controllers/user.controller');
router.get('/', controller.allGoods );
router.get( '/:goodId', controller.getGood );
router.post( '/', controller.createGood );
router.put( '/:goodId', controller.updateGood );
router.delete( '/:goodId', controller.deleteGood );

module.exports = router;

