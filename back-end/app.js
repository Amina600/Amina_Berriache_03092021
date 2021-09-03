//Importer express
const express = require('express');

const app = express();

// Middlewares reçoivent des objets request et response et next()
//Fonction next() permet à chaque middleware de passer l'exécution au middleware suivan
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });
  
  app.use((req, res, next) => {
    res.status(201);
    next();
  });
  
  app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
  });
  
  app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });
  
// export de app et pouvoir y acceder depuis les autres fichiers js
module.exports = app;