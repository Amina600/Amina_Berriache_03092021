const Sauce = require('../models/sauce');
// file system donne accès aux fonctions qui permettent de modifier le système de fichiers
const fs = require('fs');

//Enrengistrement les données de la sauce dans la basede données  
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
    sauce.save()
    .then(() => {
        res.status(201).json({
          message: 'Sauce enrengistrée !'
        });
      }
    ).catch((error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};
//Récup une sauce spécifique 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        res.status(200).json(sauce);
      }
    ).catch((error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};
//Mettre à jour une sauce 
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch((error) => {
      res.status(400).json({
        error: error
      });
    }
  );  
};
//Suppression une sauce spécifique 
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};
//Récupérer toutes les sauces 
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then((sauces) => {
        res.status(200).json(sauces);
      }
    ).catch((error) => {
        res.status(400).json({
          error: error
        });
    });
};
//Like & dislike 
exports.ctrlLikeDislike = (req, res, next) => {
  let like = req.body.like;
  let userId = req.body.userId;

  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {
    //Si l'user n'a pas déjà liké la sauce ou il n'a pas déjà disliker la sauce, on l'ajoute dans le tableau des usersliked
    if (like === 1 && !sauce.usersLiked.includes(userId) && !sauce.usersDisliked.includes(userId)){
      
      Sauce.updateOne( 
        {_id: req.params.id},
        {$push: {usersLiked: userId}, $inc: {likes: 1}}
      )
      .then(() => res.status(200).json({ message: "Sauce Likée !"}))
      .catch(error => res.status(400).json({ error }));
      
    } 
    //Si l'user n'a pas déjà liké la sauce ou il n'a pas déjà disliker la sauce, on l'ajoute dans le tableau des usersdisliked
    else if(like === -1 && !sauce.usersDisliked.includes(userId) && !sauce.usersLiked.includes(userId)) {
      Sauce.updateOne( 
        {_id: req.params.id},
        {$push: {usersDisliked: userId}, $inc: {dislikes: 1}} 
      )
      .then(() => res.status(200).json({ message: "Sauce Dislikée !"}))
      .catch(error => res.status(400).json({ error }));
      
    } else if (like === 0) {
      //Si l'user a un like, et il souhaite retirer son like, on l'enlève du tableau userlsiked
      if(sauce.usersLiked.includes(userId)){  
        Sauce.updateOne(
          {_id: req.params.id},
          {$pull: {usersLiked: userId}, $inc: {likes: -1}}
        )
        .then(() => res.status(200).json({ message: "Like/Dislike annulé !"}))
        .catch(error => res.status(400).json({ error }));
      
      }
      //Si l'user a un dislike, et il souhaite retirerson dislike, on l'enlève du tableau userdisllsiked
      else if(sauce.usersDisliked.includes(userId)){
        Sauce.updateOne(
          {_id: req.params.id},
          {$pull: {usersDisliked: userId}, $inc: {dislikes: -1}}
        )
        .then(() => res.status(200).json({ message: "Like/Dislike annulé !"}))
        .catch(error => res.status(400).json({ error }));

      }else {
        // dans d'autres cas, on renvoie le message d'erreur
        throw 'Action non autorisée !'
      }
    }else {
      throw 'Action non autorisée !'
    }
  }).catch(error => res.status(400).json({ error }));
}