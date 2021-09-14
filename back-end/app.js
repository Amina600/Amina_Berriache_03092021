require('dotenv').config();
//Importer express(permet d'ajouter une série de fonctions appelées middleware)
const express = require('express');
//Importer package body-parser pour extraire l'objet JSON.
const bodyParser = require('body-parser');
//Importer mangoose(qui facilite les interractions avec mongooseDB)
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path');



const app = express();
// connecter l'api avec mangooseDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_LINK}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//CORS, système de sécurité empêche les requêtes malveillantes d'accéder à des ressources sensibles
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
//Middleware qui transforme le corps de la requete en objet js utilisable
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes); 

app.use('/api/auth', userRoutes);

// export de app et pouvoir y acceder depuis les autres fichiers js
module.exports = app;