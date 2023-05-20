// ----------------------------------------------
// Importation du module router de express
// ----------------------------------------------
const router = require('express').Router();

// ----------------------------------------------
// Définition de l'enssembles des constantes utilisant le controller
// ----------------------------------------------
const {
    getAllPrice,
    getPriceByPair,
    getPriceByBase,
    getPriceByQuote,
    getOpportunite,
    updatePrice
} = require('../controller/crypto_price.controller');


// ----------------------------------------------
// ----------------------------------------------
// ------------ Définition des routes -----------
// ----------------------------------------------
// ----------------------------------------------

router.get('/', getAllPrice); // GET localhost:8081/api/v1/crypt_price

router.get('/pair', getPriceByPair); // GET localhost:8081/api/v1/crypt_price/pair  Sort by pair

router.get('/filter_base', getPriceByBase); // GET localhost:8081/api/v1/crypto_price/filter_base?base=****

router.get('/filter_quote', getPriceByQuote); // GET localhost:8081/api/v1/crypt_price/filter_quote?quote=****

router.post('/update', updatePrice); // PUT localhost:8081/api/v1/crypt_price/update

router.get('/opportunite', getOpportunite); // GET localhost:8081/api/v1/crypt_price/opportunite



//
  // Delete all Tutorials
 // router.delete("/", tutorials.deleteAll);

module.exports = router;