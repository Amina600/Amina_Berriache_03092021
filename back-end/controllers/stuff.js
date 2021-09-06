const Sauce = require('../models/sauces');

exports.createSauce = (req, res, next) => {
    const thing = new Sauce({
      userId: req.body.userId,
      name: req.body.name,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
      imageUrl: req.body.imageUrl,
      mainPepper: req.body.mainPepper,
      heat: req.body.heat
     
    });
    sauce.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

exports.modifySauce = (req, res, next) => {
    const sauce = new Sauce({
      _id: req.params.id,
      userId: req.body.userId,
      name: req.body.name,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
      imageUrl: req.body.imageUrl,
      mainPepper: req.body.mainPepper,
      heat: req.body.heat,
    });
    Sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
        res.status(201).json({
          message: 'Sauce updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};