const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

// enrengistrement les données de la sauce dans la basede données  
router.post('/', auth, stuffCtrl.createSauce);

// récup une sauce spécifique 
router.get('/:id', auth, stuffCtrl.getOneSauce);

// mettre à jour une sauce 
router.put('/:id', auth, stuffCtrl.modifySauce);

// suppression une sauce spécifique 
router.delete('/:id', auth, stuffCtrl.deleteSauce);

// récupérer toutes les sauces 
router.get('/' + '', auth, stuffCtrl.getAllSauce);

module.exports = router;