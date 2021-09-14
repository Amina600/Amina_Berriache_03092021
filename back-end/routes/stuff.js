const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/stuff');


// enrengistrement les données de la sauce dans la basede données  
router.post('/', auth, multer, stuffCtrl.createSauce);

// récup une sauce spécifique 
router.get('/:id', auth, stuffCtrl.getOneSauce);

// mettre à jour une sauce 
router.put('/:id', auth, multer, stuffCtrl.modifySauce);

// suppression une sauce spécifique 
router.delete('/:id', auth, stuffCtrl.deleteSauce);

// récupérer toutes les sauces 
router.get('/' + '', auth, stuffCtrl.getAllSauce);

// like & dislike 
router.post('/:id/like', auth, stuffCtrl.ctrlLikeDislike);

module.exports = router;