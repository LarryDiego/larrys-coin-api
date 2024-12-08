const tf2Model = require('../models/tf2-model');

module.exports = {
  // GET   /api/tf2/keys-to-balance
  keysToBalance: async (req, res) => {
    const { keysQuantity } = req.body;
    if (typeof keysQuantity !== 'number')
      return res
        .status(400)
        .json({ message: 'Informe a quantidade de chaves para consulta!' });

    if (keysQuantity < 1)
      return res
        .status(400)
        .json({ message: 'A quantidade mínima para compra é 1!' });

    const finalBalance = await tf2Model.keysToBalance(keysQuantity);
    res.json(finalBalance);
  },

  // GET   /api/tf2/balance-to-keys
  balanceToKeys: async (req, res) => {
    const { balance } = req.body;
    const keysNeeded = await tf2Model.balanceToKeys(balance);
    res.json(keysNeeded);
  },
};
