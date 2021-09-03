//importer le package HTTP pour créer un serveur
const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);
//si la plateforme propose un port par défaut, elle sera en écoute sur la variable process.env.PORT
// sinon elle prend le port 3000 par défault
server.listen(process.env.PORT || 3000);