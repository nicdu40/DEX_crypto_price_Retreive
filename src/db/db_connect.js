// ----------------------------------------------
// Importation des modules nécéssaires
// ----------------------------------------------
const dotenv = require('dotenv');
const mysql = require('mysql');


// ----------------------------------------------
// Initialisation et configuration
// ----------------------------------------------
//dotenv.config(); // Initialisation des variables d'environnements
dotenv.config({ path: './db/.env' });
// ----------------------------------------------
// Paramètres de connexion à la BDD
// ----------------------------------------------
console.log(process.env.HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
console.log(process.env.DB_DATABASE);

const databaseConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    //port: process.env.PORT
});

// ----------------------------------------------
// ----------------------------------------------
module.exports = databaseConnection;