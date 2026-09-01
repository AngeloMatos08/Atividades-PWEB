const express = require('express');
const router = express.Router();

// Funções de Middleware para as rotas
const homeMiddleware = (req, res) => {
    res.send('<h1>Página Inicial (/)</h1>');
};

const aboutMiddleware = (req, res) => {
    res.send('<h1>Página Sobre (/about)</h1>');
};

const dataMiddleware = (req, res) => {
    res.send('<h1>Dados Recebidos com Sucesso (/data - POST)</h1>');
};

const usersMainMiddleware = (req, res) => {
    res.send('<h1>Página de Usuários (/users)</h1>');
};

const signinMiddleware = (req, res) => {
    res.send('<h1>Página de Signin (/signin)</h1>');
};

const signupMiddleware = (req, res) => {
    res.send('<h1>Página de Signup (/signup)</h1>');
};

// Configuração das rotas usando o Router
router.get('/', homeMiddleware);
router.get('/about', aboutMiddleware);
router.get('/users', usersMainMiddleware);
router.get('/signin', signinMiddleware);
router.get('/signup', signupMiddleware);

router.post('/data', dataMiddleware);

router.get('/users/:userid', (req, res) => {
    const userId = req.params.userid;
    res.send(`<h1>Bem-vindo de volta, usuário com ID: ${userId}!</h1>`);
});

router.get('/signin/:userid', (req, res) => {
    const userId = req.params.userid;
    if (!userId) {
        return res.redirect('/signup');
    }
    res.send(`<h1>Signin com ID: ${userId}</h1>`);
});

module.exports = router;