const path = require('path');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new Database(path.join(__dirname, 'db.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL,
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'troque-essa-chave-em-producao',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.post('/api/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha nome, e-mail e senha.' });
  }
  if (senha.length < 6) {
    return res.status(400).json({ erro: 'A senha precisa ter pelo menos 6 caracteres.' });
  }

  const jaExiste = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email);
  if (jaExiste) {
    return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const resultado = db
    .prepare('INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)')
    .run(nome, email, senhaHash);

  res.status(201).json({
    usuario: { id: resultado.lastInsertRowid, nome, email }
  });
});

app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Informe e-mail e senha.' });
  }

  const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
  if (!usuario) {
    return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
  if (!senhaCorreta) {
    return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
  }

  req.session.usuarioId = usuario.id;

  res.json({
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
  });
});

app.get('/api/me', (req, res) => {
  if (!req.session.usuarioId) {
    return res.status(401).json({ erro: 'Não autenticado.' });
  }

  const usuario = db
    .prepare('SELECT id, nome, email FROM usuarios WHERE id = ?')
    .get(req.session.usuarioId);

  res.json({ usuario });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



// IA do site



app.post('/api/chat', async (req, res) => {
  const { mensagem } = req.body;

  console.log('Mensagem recebida:', mensagem);

  res.json({
    resposta: 'Olá! Recebi sua mensagem.'
  });
});
