const API_BASE = 'http://localhost:3000/api';

const botoesTab = document.querySelectorAll('.tab-btn');
const formsTab = document.querySelectorAll('.form-tab');

botoesTab.forEach((botao) => {
  botao.addEventListener('click', () => {
    botoesTab.forEach((b) => b.classList.remove('ativo'));
    formsTab.forEach((f) => f.classList.remove('ativo'));

    botao.classList.add('ativo');
    document.getElementById(
      botao.dataset.tab === 'login' ? 'formLogin' : 'formCadastro'
    ).classList.add('ativo');
  });
});

function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = 'msg ' + tipo;
}

const formLogin = document.getElementById('formLogin');
const msgLogin = document.getElementById('msgLogin');

formLogin.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const botao = formLogin.querySelector('.btn-entrar');
  botao.classList.add('carregando');

  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;

  try {
    const resposta = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mostrarMensagem(msgLogin, dados.erro || 'E-mail ou senha inválidos.', 'erro');
      return;
    }

    mostrarMensagem(msgLogin, `Bem-vindo(a), ${dados.usuario.nome}!`, 'sucesso');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 900);

  } catch (erro) {
    mostrarMensagem(msgLogin, 'Não foi possível conectar ao servidor.', 'erro');
  } finally {
    botao.classList.remove('carregando');
  }
});

const formCadastro = document.getElementById('formCadastro');
const msgCadastro = document.getElementById('msgCadastro');

formCadastro.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const botao = formCadastro.querySelector('.btn-entrar');
  botao.classList.add('carregando');

  const nome = document.getElementById('cadNome').value.trim();
  const email = document.getElementById('cadEmail').value.trim();
  const senha = document.getElementById('cadSenha').value;

  try {
    const resposta = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mostrarMensagem(msgCadastro, dados.erro || 'Não foi possível criar a conta.', 'erro');
      return;
    }

    mostrarMensagem(msgCadastro, 'Conta criada! Agora faça login.', 'sucesso');
    formCadastro.reset();

    setTimeout(() => {
      document.querySelector('.tab-btn[data-tab="login"]').click();
    }, 1000);

  } catch (erro) {
    mostrarMensagem(msgCadastro, 'Não foi possível conectar ao servidor.', 'erro');
  } finally {
    botao.classList.remove('carregando');
  }
});