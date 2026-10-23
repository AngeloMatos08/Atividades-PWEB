const express = require('express');
const app = express();
const PORT = 8000;

// Middleware para processar dados de formulários (POST)
app.use(express.urlencoded({ extended: true }));

// Dicionário de traduções para a versão 2
const translations = {
    'pt-br': {
        hello: "Olá, Mundo!",
        greeting: "Olá, "
    },
    'es': {
        hello: "¡Hola, Mundo!",
        greeting: "¡Hola, "
    },
    'en': {
        hello: "Hello, World!",
        greeting: "Hello, "
    }
};

// ==========================================
// VERSÃO 1 (v1)
// ==========================================

app.get('/v1/hi', (req, res) => {
    res.status(200).json({ msg: "Hello, world!" });
});

app.get('/v1/hi/user/:name', (req, res) => {
    res.status(200).json({ msg: "Hello, " + req.params.name });
});

app.post('/v1/hi', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    res.status(200).json({ msg: `Hello, ${name.toUpperCase()} from POST!` });
});


// ==========================================
// VERSÃO 2 (v2) - Multilíngue
// ==========================================

// 1. Endpoint GET para a mensagem geral com o idioma na URL (ex: /v2/hi/pt-br)
app.get('/v2/hi/:lang', (req, res) => {
    const lang = req.params.lang;
    const t = translations[lang] || translations['en']; // Predefinição para inglês se o idioma for inválido
    res.status(200).json({ msg: t.hello });
});

// 2. Endpoint GET para saudar um utilizador com o idioma e o nome na URL (ex: /v2/hi/es/user/Maria)
app.get('/v2/hi/:lang/user/:name', (req, res) => {
    const { lang, name } = req.params;
    const t = translations[lang] || translations['en'];
    res.status(200).json({ msg: `${t.greeting}${name}` });
});

// 3. Endpoint POST para receber dados de um formulário (contendo o nome e o idioma)
app.post('/v2/hi', (req, res) => {
    const { lang, name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const selectedLang = translations[lang] ? lang : 'en';
    const t = translations[selectedLang];

    res.status(200).json({
        msg: `${t.greeting}${name.toUpperCase()} from POST!`,
        language: selectedLang
    });
});


// ==========================================
// ENDPOINT CORINGA (Tratamento de Erro 404)
// ==========================================

// Endpoint coringa para o Express v5
app.get('/*splat', (req, res) => {
    const err = {
        error: "Invalid endpoint"
    };
    res.status(404).json(err);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Hello API running on port ${PORT}`);
});