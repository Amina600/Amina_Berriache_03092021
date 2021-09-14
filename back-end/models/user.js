const mongoose = require('mongoose');
//package de validation pour pré-valider les informations avant de les enregistrer
const uniqueValidator = require('mongoose-unique-validator');
// création le schéma du modèle USER
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);