var express = require('express');
var router = express.Router();

/* REQUISITO 4: Caso acesse sem userid, direciona para signup */
router.get('/', function(req, res, next) {
  res.redirect('/signup');
});

/* REQUISITO 3: Rota que recebe o userid e exibe msg de boas vindas */
router.get('/:userid', function(req, res, next) {
  const userId = req.params.userid;
  res.render('user', { 
    title: 'Área do Usuário', 
    userid: userId 
  });
});

module.exports = router;