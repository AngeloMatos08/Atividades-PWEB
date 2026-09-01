const express = require('express');
const app = express();
const port = 3000;

// Importando o arquivo de rotas
const routes = require('./routes');

// Middleware de aplicação para log das requisições
const appLogger = (req, res, next) => {
    console.log(`[LOG] Requisição recebida para: ${req.url} | Método: ${req.method}`);
    next();
};

app.use(appLogger);

// Middlewares para parsing de dados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registrando o Router na aplicação principal
app.use('/', routes);

// Middleware para tratamento de Erro 404 (Página Não Encontrada)
app.use((req, res) => {
    res.status(404).send(`
        <h1>Erro 404 - Página Não Encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <a href="/">Voltar para a Página Inicial</a>
    `);
});

// Inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});