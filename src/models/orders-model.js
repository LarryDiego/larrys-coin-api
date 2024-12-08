require('dotenv').config();
const fetchPrice = require('../services/steamPrice');

const uuid = require('uuid').v4;

const tf2 = {
  price: process.env.TF2_PRICE,
};

const orders = [
  {
    id: '1',
    userId: '1',
    userName: 'Larry Diego',
    orderDate: new Date('2024-12-01'),
    quantity: 10,
    finalPrice: 'R$ 100.00',
    finalBalance: 'R$ 115.00',
  },
];

async function getSteamPrice() {
  const price = await fetchPrice();
  if (price !== null) {
    const reducedPrice = parseFloat((price * 0.8697).toFixed(2));
    return reducedPrice;
  } else {
    return null;
  }
}

module.exports = {
  getAllOrders: () => orders,

  getOrderById: (id) => orders.find((order) => order.id === id),

  keysToBalance: async (keysQuantity) => {
    const reducedPrice = await getSteamPrice();
  },

  balanceToKeys: async (balance) => {
    const reducedPrice = await getSteamPrice();
  },

  createOrderByQuantity: async (user, quantity) => {
    const reducedPrice = await getSteamPrice();

    if (reducedPrice === null || isNaN(reducedPrice)) {
      return null;
    }

    const finalPricePaid = 'R$ ' + (tf2.price * quantity).toFixed(2);
    const finalBalanceReceived = 'R$ ' + (reducedPrice * quantity).toFixed(2);

    const newOrder = {
      id: uuid(),
      userId: user.id,
      userName: user.name,
      orderDate: new Date(),
      quantity: quantity,
      finalPrice: finalPricePaid,
      finalBalance: finalBalanceReceived,
    };

    orders.push(newOrder);
    return newOrder;
  },
};
