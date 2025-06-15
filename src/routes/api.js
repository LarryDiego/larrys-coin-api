const express = require('express');
const ordersController = require('../controllers/orders-controller');
const { ensureAuth } = require('../middlewares/auth-middleware');
const tf2Controller = require('../controllers/tf2-controller');
const apiRouter = express.Router();

apiRouter.get('/orders', ordersController.index);
apiRouter.get('/orders/:id', ordersController.show);
apiRouter.get('/tf2/keys-to-balance', tf2Controller.keysToBalance);
apiRouter.get('/tf2/balance-to-keys', tf2Controller.balanceToKeys);
apiRouter.post('/orders', ensureAuth, ordersController.save);
apiRouter.post('/create-pix', ordersController.createPix);

module.exports = apiRouter;
