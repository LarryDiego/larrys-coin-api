require('dotenv').config();
const fetchPrice = require('../services/steamPrice');

const tf2 = {
  price: process.env.TF2_PRICE,
};

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
  keysToBalance: async (keysQuantity) => {
    const reducedPrice = await getSteamPrice();

    const finalPricePaid = 'R$ ' + (tf2.price * keysQuantity).toFixed(2);
    const finalBalanceReceived =
      'R$ ' + (reducedPrice * keysQuantity).toFixed(2);

    const keysToBalanceInfo = {
      message: `Com ${keysQuantity} chave(s) você receberá aproximadamente ${finalBalanceReceived}!`,
      finalPrice: finalPricePaid,
      finalBalance: finalBalanceReceived,
    };
    return keysToBalanceInfo;
  },

  balanceToKeys: async (balance) => {
    const reducedPrice = await getSteamPrice();

    const keysNeeded = Math.ceil(balance / reducedPrice);
    const finalBalanceReceived = 'R$ ' + (reducedPrice * keysNeeded).toFixed(2);
    const finalPricePaid = 'R$ ' + (tf2.price * keysNeeded).toFixed(2);

    const balanceToKeysInfo = {
      message: `Para obter R$ ${balance} de saldo, você precisa ${keysNeeded} chave(s), e no final irá obter R$ ${finalBalanceReceived}!`,
      keysQuantity: keysNeeded,
      finalPrice: finalPricePaid,
      finalBalance: finalBalanceReceived,
    };

    return balanceToKeysInfo;
  },
};
