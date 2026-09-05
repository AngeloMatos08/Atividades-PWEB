var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Página Inicial (Index)' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('page', { title: 'Sobre Nós (/about)' });
});

/* GET signin page. */
router.get('/signin', function(req, res, next) {
  res.render('page', { title: 'Entrar (/signin)' });
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('page', { title: 'Cadastrar (/signup)' });
});

/* POST data route. */
router.post('/data', function(req, res, next) {
  res.send('Você acessou a rota /data através de uma requisição POST.');
});

module.exports = router;