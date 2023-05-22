// ----------------------------------------------
// Importantion du modèle pour la table
// ----------------------------------------------
const crypto_price_Model = require('../models/crypto_price.model');
//const utils = require('../middleware/utils.middleware');
const dataBase = require('../db/db_connect');
// ----------------------------------------------
// Récupérer l'enssembles des cryptos
// ----------------------------------------------
getAllPrice = (request, response) => {
    crypto_price_Model.getAllPrice((error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Une erreur est survenue en essayant de récupérer la table crypto_price."
            });
        else {
            response.send(data);
        }
    });
};


// ----------------------------------------------
// sort by pair
// ----------------------------------------------
getPriceByPair = (request, response) => {
    crypto_price_Model.getPriceByPair((error, data) => {
        if (error) {
            if (error.kind === "pair_not_found") {
                response.status(404).send({
                    message: `pair not fount(table vide?)`
                });
            } else {
                response.status(500).send({
                    message: `error 500`
                });
            }
        }else {
            response.send(data);
        }
    });
};


// ----------------------------------------------
// print base
// ----------------------------------------------
getPriceByBase = (request, response) => {
    crypto_price_Model.getPriceByBase(request.query.base, (error, data) => {
        if (error) {
            if (error.kind === "base_not_found") {
                response.status(404).send({
                    message: `${request.query.base} Not FOUND`
                });
            } else {
                response.status(500).send({
                    message: `error 500`
                });
            }
        } else {
            response.send(data);
        }
    });
};



// ----------------------------------------------
// print quote
// ----------------------------------------------
getPriceByQuote = (request, response) => {
    crypto_price_Model.getPriceByQuote(request.query.quote, (error, data) => {
        if (error) {
            if (error.kind === "quote_not_found") {
                response.status(404).send({
                    message: `${request.query.quote} Not FOUND`
                });
            } else {
                response.status(500).send({
                    message: `error 500`
                });
            }
        } else {
            response.send(data);
        }
    });
};


// ----------------------------------------------
// get Opportunite
// ----------------------------------------------
getOpportunite = (request, response) => {
    crypto_price_Model.getOpportunite((error, data) => {
        if (error) {
            if (error.kind === "opportunite_not_found") {
                response.status(404).send({
                    message: `aucune opportunité`
                });
            } else {
                response.status(500).send({
                    message: `error 500`
                });
            }
        }else {
            response.send(data);
        }
    });
};


// ----------------------------------------------
// updatePrice
// ----------------------------------------------

updatePrice = (request, response) => {
    if (!request.body) {
        response.status(400).send({
            message: "Le contenu ne peut être vide !"
        });
    } else {
        crypto_price_Model.updatePrice(dataBase)
            .then(() => {
                response.status(200).send('Prices updated !');
            })
            .catch(error => {
                response.status(500).send({
                    message: "Error while updated prices",
                    error: error
                });

            });
    }
};

deleteAll = (request, response) => {
    crypto_price_Model.deleteAll((error, data) => {
        if (error)
            response.status(500).send({
                message:
                    error.message || "Une erreur est survenue en essayant de supprimer la table crypto_price."
            });
        else {
            response.send(data);
        }
    });
};

// ----------------------------------------------
// ----------------------------------------------

module.exports = {
    getAllPrice,
    getPriceByPair,
    getPriceByBase,
    getPriceByQuote,
    getOpportunite,
    updatePrice,
    deleteAll,
};
