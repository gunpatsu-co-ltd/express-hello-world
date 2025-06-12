// 必要なモジュールの読み込み
const express = require('express');
const axios = require('axios');
const app = express();

// ポート番号
const PORT = 3001; // 3000でもOK、他アプリが使ってなければ

// 環境変数からAPIキーを取得（次ステップで設定します）
const API_KEY = process.env.LIBRARY_API_KEY || 'ここにあなたのAPIキー';

// サンプルAPI中継エンドポイント
app.get('/proxy', async (req, res) => {
    try {
        // クエリパラメータ取得（例: city, from, to）
        const { city, from, to } = req.query;

        // 外部API（不動産情報ライブラリ）にリクエスト
        const response = await axios.get('https://api.land.mlit.go.jp/webland/v2/api/TradeListSearch', {
            params: { city, from, to },
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        });

        // 結果をそのまま返却
        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: 'API連携エラー', detail: error.message });
    }
});

// 動作確認用トップページ
app.get('/', (req, res) => {
    res.send('Renderからこんにちは！ プロキシAPI稼働中');
});

// サーバー起動
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
