const HttpError = require('../errors/HttpError');
const ordersModel = require('../models/orders-model');

module.exports = {
  // GET    /api/orders
  index: (req, res) => {
    const orders = ordersModel.getAllOrders();
    res.json(orders);
  },
  // GET    /api/orders/:id
  show: (req, res) => {
    const { id } = req.params;
    const order = ordersModel.getOrderById(id);
    if (!order) throw new HttpError(404, 'Pedido não encontrado!');
    res.json(order);
  },
  // POST   /api/orders
  save: async (req, res) => {
    const user = req.user;
    const { quantity } = req.body;
    if (quantity < 1)
      return res
        .status(400)
        .json({ message: 'A quantidade mínima para compra é 1!' });

    const newOrder = await ordersModel.createOrderByQuantity(user, quantity);
    if (!newOrder) {
      return res
        .status(400)
        .json({ message: 'Erro ao consultar o servidor da Steam!' });
    }

    res.status(201).json(newOrder);
  },
};
