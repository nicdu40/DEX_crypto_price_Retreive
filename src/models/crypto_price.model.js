// ----------------------------------------------
// Importation de la connexion à la bdd
// ----------------------------------------------
const dataBase = require('../db/db_connect');
const createTableQuery = `
            CREATE TABLE crypto_price_table (
            id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
            pair VARCHAR(255),
            base VARCHAR(255),
            quote VARCHAR(255),
            buy FLOAT,
            sell FLOAT,
            buy_usdt FLOAT,
            sell_usdt FLOAT
            )`;
const dropTableQuery = 'DROP TABLE IF EXISTS crypto_price_table';
// ----------------------------------------------
// Récupérer l'enssembles des cryptos
// ----------------------------------------------
getAllPrice = result_bdd_request => {
    dataBase.query(`SELECT id, pair, base, quote, buy, sell, buy_usdt, sell_usdt FROM crypto_price_table`, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        result_bdd_request(null, response);
    });
};

// ----------------------------------------------
// Sort by pair
// ----------------------------------------------
getPriceByPair = (result_bdd_request) => {
    dataBase.query(`SELECT id, pair, base, quote, buy, sell, buy_usdt, sell_usdt FROM crypto_price_table ORDER BY pair`, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.length) {
            result_bdd_request(null, response);
            return;
        }
        result_bdd_request({ kind: "pair_not_found" });
    });
};

// ----------------------------------------------
// Récupère crypto by base
// ----------------------------------------------
getPriceByBase = (selectedBase, result_bdd_request) => {
    dataBase.query(`SELECT id, pair, base, quote, buy, sell, buy_usdt, sell_usdt FROM crypto_price_table WHERE base = '${selectedBase}' ORDER BY quote`, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.length) {
            result_bdd_request(null, response);
            return;
        }
        result_bdd_request({ kind: "base_not_found" });
    });
};


// ----------------------------------------------
// Récupère crypto by quote
// ----------------------------------------------
getPriceByQuote = (selectedQuote, result_bdd_request) => {
    dataBase.query(`SELECT id, pair, base, quote, buy, sell, buy_usdt, sell_usdt FROM crypto_price_table WHERE quote = '${selectedQuote}' ORDER BY base`, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.length) {
            result_bdd_request(null, response);
            return;
        }
        result_bdd_request({ kind: "quote_not_found" });
    });
};

// ----------------------------------------------
// get opportunité from crypto_price_table(if sell value usdt > buy value usdt))
// ----------------------------------------------
getOpportunite = (result_bdd_request) => {
    dataBase.query(`SELECT t.id, t.pair, t.base, t.quote, t.buy, t.sell, t.buy_usdt, t.sell_usdt FROM crypto_price_table t
    WHERE t.base IN (SELECT base FROM crypto_price_table GROUP BY base HAVING COUNT(base) > 1)
    AND ((t.buy_usdt = (SELECT MAX(buy_usdt) FROM crypto_price_table WHERE base = t.base) OR
    t.sell_usdt = (SELECT MIN(sell_usdt)
    FROM crypto_price_table WHERE base = t.base))
    )
    AND (t.buy_usdt > (SELECT MIN(sell_usdt) FROM crypto_price_table WHERE base = t.base) OR
    t.sell_usdt < (SELECT MAX(buy_usdt)
    FROM crypto_price_table WHERE base = t.base))
    ORDER BY t.base `, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        if (response.length) {
            result_bdd_request(null, response);
            return;
        }
        //result_bdd_request(null, response);
        result_bdd_request({ kind: "opportunite_not_found" });
    });
};

// ----------------------------------------------
// update Price in  crypto_price_table
// ----------------------------------------------
const { exec } = require('child_process');
//updatePrice = (dataBase, response) => {
updatePrice = (dataBase) => {
    return new Promise((resolve, reject) => {
        dataBase.query(dropTableQuery, (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la suppression de la table :', error);
                dataBase.end(); // Ferme la connexion MySQL en cas d'erreur
                reject(error);
                return;
            }
            console.log('Table supprimée avec succès !');
        });

        dataBase.query(createTableQuery, (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la création de la table :', error);
                reject(error);
            } else {
                console.log('Table créée avec succès !');
            }
        });

        exec('node wget_price_update.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur lors de l'exécution du script : ${error.message}`);
                reject(error);
            } else {
                console.log('Script exécuté avec succès !');
                resolve(); 
                //  }
            }
        });
    });
};


deleteAll = (result_bdd_request) => {
    dataBase.query(dropTableQuery, (error, response) => {
        if (error) {
            result_bdd_request(error);
        }
        result_bdd_request(null, response);
        console.log('Table supprimée avec succès !');
    });

    dataBase.query(createTableQuery, (error) => {
        if (error) {
            console.error('Erreur lors de la création de la table :', error);
            reject(error);
        } else {
            console.log('Table créée avec succès !');
        }
    });
};

module.exports = {
    getAllPrice,
    getPriceByPair,
    getPriceByBase,
    getPriceByQuote,
    getOpportunite,
    updatePrice,
    deleteAll
};
