const fetch = require('node-fetch');

async function fetchPrice() {
  const url =
    'https://steamcommunity.com/market/itemordershistogram?country=BR&language=brazilian&currency=7&item_nameid=1';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const data = await response.json();
    const buyOrderGraph = data.buy_order_graph;

    if (buyOrderGraph && buyOrderGraph.length > 0) {
      const price = buyOrderGraph[0][0];
      return price;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao executar fetch:', error.message);
  }
}

module.exports = fetchPrice;
