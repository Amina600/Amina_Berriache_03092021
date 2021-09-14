//Les tokens d'authentification permettent aux utilisateurs de ne se connecter qu'une seule fois à leur compte.
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '*`1EL2)bs;1.LC(');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: new Error('Invalid request!')
    });
  }
};