const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');

// enrengistrement les données de la sauce dans la basede données  
router.post('/',stuffCtrl.createSauce);

// récup une sauce spécifique 
router.get('/:id',stuffCtrl.getOneSauce);

// mettre à jour une sauce 
router.put('/:id',stuffCtrl.modifySauce);

// suppression une sauce spécifique 
router.delete('/:id',stuffCtrl.deleteSauce);

// récupérer toutes les sauces 
router.get('/' + '', stuffCtrl.getAllSauce);

module.exports = router;