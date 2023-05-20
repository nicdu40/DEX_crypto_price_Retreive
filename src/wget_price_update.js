const https = require('https');
const fs = require('fs');
const dataBase = require('./db/db_connect');
let BTC_buy = 0;
let BTC_sell = 0;
let ETH_buy = 0;
let ETH_sell = 0;


// Lecture du fichier "pairs"
fs.readFile('pairs', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file: ' + err);
    return;
  }

  const lines = data.trim().split('\n');

  // Fonction récursive pour traiter chaque ligne du fichier "pairs"
  function processLine(index) {
    if (index >= lines.length) {
      // Toutes les lignes ont été traitées, fermeture de la connexion à la base de données
      dataBase.end();
      return;
    }

    const line = lines[index].trim();
    const [pair, base, quote] = line.split(';');

    const url = `https://api.dex-trade.com/v1/public/book?pair=${pair}`;
    console.log(pair);

    https.get(url, (response) => {
      let responseData = '';

      response.on('data', (chunk) => {
        responseData += chunk;
      });

      response.on('end', () => {
        try {
          const data = JSON.parse(responseData);
          const buy = data.data.buy[0].rate;
          const sell = data.data.sell[0].rate;

          // Effectuer les calculs nécessaires avec les valeurs buy et sell
          let buy_usdt, sell_usdt;

          if (pair.includes('BTCUSDT')) {
            BTC_buy = buy;
            BTC_sell = sell;
          }
          if (pair.includes('ETHUSDT')) {
            ETH_buy = buy;
            ETH_sell = sell;
          }
          if (quote.includes('USDT')) {
            buy_usdt = buy;
            sell_usdt = sell;
          } else if (quote.includes('BTC')) {
            buy_usdt = (parseFloat(buy) * parseFloat(BTC_buy)).toString();
            sell_usdt = (parseFloat(sell) * parseFloat(BTC_sell)).toString();
          } else if (quote.includes('ETH')) {
            buy_usdt = (parseFloat(buy) * parseFloat(ETH_buy)).toString();
            sell_usdt = (parseFloat(sell) * parseFloat(ETH_sell)).toString();
          }

          const sql = `INSERT INTO crypto_price_table (pair, base, quote, buy, sell, buy_usdt, sell_usdt) VALUES ('${pair}', '${base}', '${quote}', '${buy}', '${sell}', '${buy_usdt}', '${sell_usdt}')`;
          dataBase.query(sql, (error) => {
            if (error) {
              console.error('Error executing query: ' + error);
            }

            // Appeler récursivement processLine pour passer à la ligne suivante
            processLine(index + 1);
          });
        } catch (e) {
          console.error('Error parsing JSON: ' + e);
          // Appeler récursivement processLine pour passer à la ligne suivante
          processLine(index + 1);
        }
      });
    }).on('error', (e) => {
      console.error('Error making HTTP request: ' + e);
      // Appeler récursivement processLine pour passer à la ligne suivante
      processLine(index + 1);
    });
  }

  // Appeler processLine pour commencer à traiter la première ligne

  processLine(0);
});