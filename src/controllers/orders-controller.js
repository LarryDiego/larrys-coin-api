const HttpError = require('../errors/HttpError');
const ordersModel = require('../models/orders-model');
const { MercadoPagoConfig, Payment } = require('mercadopago');

const uuid = require('uuid').v4;

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: 'abc',
  },
});

const payment = new Payment(client);

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
  // POST   /api/orders
  createPix: async (req, res) => {
    try {
      const body = {
        transaction_amount: req.body.transaction_amount,
        description: req.body.description,
        payment_method_id: 'pix',
        payer: {
          email: req.body.email,
        },
      };
      const orderId = uuid();

      const requestOptions = { idempotencyKey: orderId };

      const result = await payment.create({ body, requestOptions });

      const pixUrl = result.point_of_interaction.transaction_data.ticket_url;

      res.json({
        message: 'Pix criado com sucesso',
        pix_url: pixUrl,
      });
    } catch (error) {
      console.error('Erro ao criar Pix:', error);
      res
        .status(500)
        .json({ message: 'Erro ao criar Pix', error: error.message });
    }
  },
};
