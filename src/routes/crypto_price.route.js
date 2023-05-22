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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Print all table (sort by id)
 *     description: Print all table (sort by id)
*     responses:
*       "200":
*         description: success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/crypto_price_table_items'
*       "400":
*         description: Error
*     x-swagger-router-controller: Options
*/
router.get('/', getAllPrice); // GET localhost:8081/api/v1/crypt_price

/**
* @swagger
* /pair:
*   get:
*     summary: Print all table (sort by pair)
*     description: Print all table (sort by pair)
*     responses:
*       "200":
*         description: success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/crypto_price_table_items'
*       "400":
*         description: Error
*     x-swagger-router-controller: Options
*/
router.get('/pair', getPriceByPair); // GET localhost:8081/api/v1/crypt_price/pair  Sort by pair

/**
* @swagger
* /filter_base:
*    get:
*      summary: Get price by base (/filter_base?base=BTC)
*      description: Get price by base (/filter_base?base=BTC)
*      operationId: getPriceByBase
*      parameters:
*      - name: base
*        in: query
*        description: 'The base that needs to be fetched. Use BTC for testing. '
*        required: true
*        style: form
*        explode: true
*        schema:
*          type: string
*      responses:
*        "200":
*          description: success
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/crypto_price_table_items'
*        "400":
*          description: Error
*      x-swagger-router-controller: Options
*/
router.get('/filter_base', getPriceByBase); // GET localhost:8081/api/v1/crypto_price/filter_base?base=****


/**
* @swagger
* /filter_quote:
*    get:
*      summary: Get price by quote (/filter_quote?quote=BTC)
*      description: Get price by quote (/filter_quote?quote=BTC)
*      operationId: getPriceByBase
*      parameters:
*      - name: quote
*        in: query
*        description: 'The quote that needs to be fetched. Use BTC for testing. '
*        required: true
*        style: form
*        explode: true
*        schema:
*          type: string
*      responses:
*        "200":
*          description: success
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/crypto_price_table_items'
*        "400":
*          description: Error
*      x-swagger-router-controller: Options
*/
router.get('/filter_quote', getPriceByQuote); // GET localhost:8081/api/v1/crypt_price/filter_quote?quote=****

/**
* @swagger
* /update:
*   post:
*     summary: "Drop table,download, update prices, convert and insert values in USDT"
*     description: "Drop table,download, update prices, convert and insert values\
*       \ in USDT"
*     operationId: updatePrice
*     responses:
*       default:
*         description: Prices updated !
*     x-swagger-router-controller: Options
*/
router.post('/update', updatePrice); // PUT localhost:8081/api/v1/crypt_price/update

/**
* @swagger
* /opportunite:
*   get:
*     summary: Print all opportunity
*     description: ""
*     operationId: getOpportunite
*     responses:
*       "200":
*         description: success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/crypto_price_table_items'
*       "400":
*         description: Error
*     x-swagger-router-controller: Options
*/
router.get('/opportunite', getOpportunite); // GET localhost:8081/api/v1/crypt_price/opportunite



/**
* @swagger
* /delete:
*   delete:
*     summary: delete all db
*     description: ""
*     responses:
*       "200":
*         description: success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/crypto_price_table_items'
*       "400":
*         description: Error
*     x-swagger-router-controller: Options
*/
router.delete('/delete', deleteAll);



//exports
module.exports = router;



/**
* @swagger
*components:
*  schemas:
*    crypto_price_table_items:
*      type: array
*      items:
*        type: object
*        properties:
*          id:
*            type: integer
*            description: ID dans la BDD.
*            example: 1
*          pair:
*            type: string
*            description: pair.
*            example: AAVEBTC
*          base:
*            type: string
*            description: base.
*            example: AAVE
*          quote:
*            type: string
*            description: quote.
*            example: BTC
*          buy:
*            type: integer
*            description: buy price
*          sell:
*            type: integer
*            description: sell price
*          buy_usdt:
*            type: integer
*            description: buy in usdt
*          sell_usdt:
*            type: integer
*            description: sell in usdt.
*        example:
*          id: 1
*          pair: AAVEBTC
*          base: AAVE
*          quote: BTC
*          buy: 0.002381
*          sell: 0.002387
*          buy_usdt: 63.4892
*          sell_usdt: 63.7792
*/