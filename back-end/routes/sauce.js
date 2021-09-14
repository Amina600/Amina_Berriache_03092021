const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');


//Enrengistrement les données de la sauce dans la basede données  
router.post('/', auth, multer, sauceCtrl.createSauce);

//Récup une sauce spécifique 
router.get('/:id', auth, sauceCtrl.getOneSauce);

//Mettre à jour une sauce 
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//Suppression une sauce spécifique 
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//Récupérer toutes les sauces 
router.get('/' + '', auth, sauceCtrl.getAllSauce);

//Like & dislike 
router.post('/:id/like', auth, sauceCtrl.ctrlLikeDislike);

module.exports = router;