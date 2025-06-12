const express = require('express');
const axios = require('axios');
const app = express();

// ここにあなたのAPIキーをセット
const API_KEY = '1c1d178f0914446f836dc092a9b76f24';

app.get('/api', async (req, res) => {
  try {
    const { from, to, city } = req.query;
    const response = await axios.get('https://www.land.mlit.go.jp/webland/api/TradeListSearch', {
      params: { from, to, city },
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(3001, () => {
  console.log('Proxy server running on port 3001');
});
