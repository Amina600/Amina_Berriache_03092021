// Multer permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
//Enregistrement des fichiers dans le dossier images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //Utilisation le nom d'origine (remplacer les espaces par des underscores)
  //et ajouter un Date.now() comme nom de fichier en utilisant const type MIME pour l'extension de fichier.
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');