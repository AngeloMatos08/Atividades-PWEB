const express = require('express');
const app = express();
const port = 3000;

const appLogger = (req, res, next) => {
    console.log(`[LOG] Requisição recebida para: ${req.url} | Método: ${req.method}`);
    next();
};

app.use(appLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


app.get('/', homeMiddleware);
app.get('/about', aboutMiddleware);
app.get('/users', usersMainMiddleware);
app.get('/signin', signinMiddleware);
app.get('/signup', signupMiddleware);

app.post('/data', dataMiddleware);

app.get('/users/:userid', (req, res) => {
    const userId = req.params.userid;
    res.send(`<h1>Bem-vindo de volta, usuário com ID: ${userId}!</h1>`);
});

app.get('/signin/:userid', (req, res) => {
    const userId = req.params.userid;
    if (!userId) {
        return res.redirect('/signup');
    }
    res.send(`<h1>Signin com ID: ${userId}</h1>`);
});

app.use((req, res) => {
    res.status(404).send(`
        <h1>Erro 404 - Página Não Encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <a href="/">Voltar para a Página Inicial</a>
    `);
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});