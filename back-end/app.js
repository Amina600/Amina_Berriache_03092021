//Importer express, mangoose
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const stuffRoutes = require('./routes/stuff');
const path = require('path');


const app = express();
// connecter l'api avec mangooseDB
mongoose.connect('mongodb+srv://amoza:dayfutur1@cluster0.fns7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middlewares reçoivent des objets request et response et next()
//Fonction next() permet à chaque middleware de passer l'exécution au middleware suivant

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', stuffRoutes); 
app.use('/api/auth', userRoutes);
// export de app et pouvoir y acceder depuis les autres fichiers js
module.exports = app;