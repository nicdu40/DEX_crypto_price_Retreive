// ----------------------------------------------
// Importation des modules nécéssaires
// ----------------------------------------------
const dotenv = require('dotenv');
const express = require('express');


// ----------------------------------------------
// Importation des routes
// ----------------------------------------------
const crypto_price_Route = require('./routes/crypto_price.route');
const docRoute = require('./routes/swagger.route');


// ----------------------------------------------
// Initialisation et configuration
// ----------------------------------------------
dotenv.config(); // Initialisation des variables d'environnements

const server = express();
server.use(express.json()); // Spécifie que la réponse est au format json
server.set('json spaces', 2); // Permet de formatter la réponse pour réspécter l'indendation d'un json

// ----------------------------------------------
// Déclaration des endpoints
// ----------------------------------------------
server.use('/api/v1', docRoute);
server.use('/api/v1/crypto_price', crypto_price_Route);

// ----------------------------------------------
// Lancement du server sur le port 8081
// ----------------------------------------------
const port = Number(process.env.PORT || 8081);
server.listen(port);
console.log('Listening on port ' + port);
// ----------------------------------------------
// ----------------------------------------------
module.exports = server;