const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.static('site'));

// --- CONEXÃO E CRIAÇÃO DO BANCO DE DADOS ---
// Isso cria um arquivo chamado 'banco.db' na sua pasta para salvar tudo de verdade
const db = new sqlite3.Database('./banco.db', (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite com sucesso!");
    }
});

// Criando as tabelas caso elas ainda não existam
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS lista (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        codinome TEXT,
        tipo TEXT,
        status TEXT,
        localizacao TEXT,
        imagem TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS equipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS localizacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS habilidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS quadrinhos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT
    )`);
});


// ================= ROTAS GET (BUSCAR DADOS) =================

app.get('/api/lista', (req, res) => {
    db.all("SELECT * FROM lista", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    });
});

app.get('/api/equipes', (req, res) => {
    db.all("SELECT * FROM equipes", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    });
});

app.get('/api/localizacoes', (req, res) => {
    db.all("SELECT * FROM localizacoes", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    });
});

app.get('/api/habilidades', (req, res) => {
    db.all("SELECT * FROM habilidades", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    });
});

app.get('/api/quadrinhos', (req, res) => {
    db.all("SELECT * FROM quadrinhos", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    });
});


// ================= ROTAS POST (SALVAR DADOS COM SQL) =================

// Rota POST: Personagens (Lista) - Igualzinho ao que sua professora explicou na foto
app.post('/api/lista', (req, res) => {
    const { nome, codinome, tipo, status, localizacao, imagem } = req.body;
    
    const sql = `INSERT INTO lista (nome, codinome, tipo, status, localizacao, imagem) VALUES (?, ?, ?, ?, ?, ?)`;
    const valores = [nome, codinome, tipo, status, localizacao, imagem];

    db.run(sql, valores, function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json({ status: "sucesso", id: this.lastID });
    });
});

app.post('/api/equipes', (req, res) => {
    const { nome } = req.body;
    const sql = `INSERT INTO equipes (nome) VALUES (?)`;
    
    db.run(sql, [nome], function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json({ status: "sucesso", id: this.lastID });
    });
});

app.post('/api/localizacoes', (req, res) => {
    const { nome } = req.body;
    const sql = `INSERT INTO localizacoes (nome) VALUES (?)`;
    
    db.run(sql, [nome], function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json({ status: "sucesso", id: this.lastID });
    });
});

app.post('/api/habilidades', (req, res) => {
    const { nome } = req.body;
    const sql = `INSERT INTO habilidades (nome) VALUES (?)`;
    
    db.run(sql, [nome], function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json({ status: "sucesso", id: this.lastID });
    });
});

app.post('/api/quadrinhos', (req, res) => {
    const { titulo } = req.body;
    const sql = `INSERT INTO quadrinhos (titulo) VALUES (?)`;
    
    db.run(sql, [titulo], function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json({ status: "sucesso", id: this.lastID });
    });
});


// --- INICIA O SERVIDOR ---
app.listen(3000, () => {
    console.log("Servidor escutando em http://localhost:3000");
});