document.addEventListener('DOMContentLoaded', () => {

  // =====================================================
  // ELEMENTOS
  // =====================================================

  const botaoAssistente = document.getElementById('assistente-botao');
  const chatAssistente = document.getElementById('assistente-chat');
  const botaoFechar = document.getElementById('assistente-fechar');

  const formAssistente = document.getElementById('assistente-form');
  const inputAssistente = document.getElementById('assistente-input');
  const mensagens = document.getElementById('assistente-mensagens');
  const botaoEnviar = document.getElementById('assistente-enviar');


  // =====================================================
  // VERIFICAÇÃO
  // =====================================================

  if (
    !botaoAssistente ||
    !chatAssistente ||
    !botaoFechar ||
    !formAssistente ||
    !inputAssistente ||
    !mensagens ||
    !botaoEnviar
  ) {
    console.error('Elementos do assistente não encontrados.');
    return;
  }


  // =====================================================
  // ABRIR CHAT
  // =====================================================

  function abrirChat() {
    chatAssistente.classList.add('aberto');

    botaoAssistente.setAttribute('aria-expanded', 'true');
    chatAssistente.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      inputAssistente.focus();
    }, 200);
  }


  // =====================================================
  // FECHAR CHAT
  // =====================================================

  function fecharChat() {
    chatAssistente.classList.remove('aberto');

    botaoAssistente.setAttribute('aria-expanded', 'false');
    chatAssistente.setAttribute('aria-hidden', 'true');
  }


  // =====================================================
  // EVENTOS DO BOTÃO
  // =====================================================

  botaoAssistente.addEventListener('click', () => {

    const estaAberto = chatAssistente.classList.contains('aberto');

    if (estaAberto) {
      fecharChat();
    } else {
      abrirChat();
    }

  });


  botaoFechar.addEventListener('click', fecharChat);


  // =====================================================
  // ADICIONAR MENSAGEM NA TELA
  // =====================================================

  function adicionarMensagem(texto, tipo) {

    const mensagem = document.createElement('div');

    mensagem.classList.add(
      'mensagem',
      tipo === 'usuario'
        ? 'mensagem-usuario'
        : 'mensagem-ia'
    );


    // Avatar somente para IA
    if (tipo !== 'usuario') {

      const avatar = document.createElement('div');

      avatar.className = 'mensagem-avatar';
      avatar.textContent = '🤖';

      mensagem.appendChild(avatar);
    }


    const conteudo = document.createElement('div');

    conteudo.className = 'mensagem-conteudo';

    // textContent evita interpretar HTML enviado pelo usuário
    conteudo.textContent = texto;

    mensagem.appendChild(conteudo);

    mensagens.appendChild(mensagem);

    rolarParaBaixo();

    return mensagem;
  }


  // =====================================================
  // SCROLL AUTOMÁTICO
  // =====================================================

  function rolarParaBaixo() {

    mensagens.scrollTo({
      top: mensagens.scrollHeight,
      behavior: 'smooth'
    });

  }


  // =====================================================
  // INDICADOR "DIGITANDO..."
  // =====================================================

  function mostrarDigitando() {

    const mensagem = document.createElement('div');

    mensagem.className = 'mensagem mensagem-ia';
    mensagem.id = 'mensagem-digitando';


    const avatar = document.createElement('div');

    avatar.className = 'mensagem-avatar';
    avatar.textContent = '🤖';


    const conteudo = document.createElement('div');

    conteudo.className = 'mensagem-conteudo';
    conteudo.textContent = 'Digitando...';


    mensagem.appendChild(avatar);
    mensagem.appendChild(conteudo);

    mensagens.appendChild(mensagem);

    rolarParaBaixo();
  }


  // =====================================================
  // REMOVER "DIGITANDO..."
  // =====================================================

  function removerDigitando() {

    const mensagem = document.getElementById('mensagem-digitando');

    if (mensagem) {
      mensagem.remove();
    }

  }


  // =====================================================
  // DESABILITAR ENVIO
  // =====================================================

  function definirCarregando(carregando) {

    inputAssistente.disabled = carregando;
    botaoEnviar.disabled = carregando;

    if (carregando) {

      botaoEnviar.textContent = '...';

    } else {

      botaoEnviar.textContent = '➤';

    }
  }


  // =====================================================
  // ENVIAR MENSAGEM
  // =====================================================

  formAssistente.addEventListener('submit', async (evento) => {

    evento.preventDefault();

    const mensagem = inputAssistente.value.trim();

    if (!mensagem) {
      return;
    }


    // Mostra mensagem do usuário
    adicionarMensagem(mensagem, 'usuario');

    // Limpa campo
    inputAssistente.value = '';

    // Mostra carregamento
    definirCarregando(true);
    mostrarDigitando();


    try {

      const resposta = await fetch('/api/chat', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        credentials: 'include',

        body: JSON.stringify({
          mensagem: mensagem
        })

      });


      let dados;

      try {
        dados = await resposta.json();
      } catch {
        throw new Error('Resposta inválida do servidor.');
      }


      removerDigitando();


      if (!resposta.ok) {

        adicionarMensagem(
          dados.erro || 'Não consegui responder agora.',
          'ia'
        );

        return;
      }


      // Resposta da IA
      adicionarMensagem(
        dados.resposta || 'Não recebi uma resposta.',
        'ia'
      );


    } catch (erro) {

      console.error('Erro no assistente:', erro);

      removerDigitando();

      adicionarMensagem(
        'Não foi possível conectar ao assistente. Tente novamente.',
        'ia'
      );

    } finally {

      definirCarregando(false);

      inputAssistente.focus();

    }

  });


  // =====================================================
  // ENTER
  // =====================================================

  inputAssistente.addEventListener('keydown', (evento) => {

    if (evento.key === 'Enter' && !evento.shiftKey) {

      evento.preventDefault();

      formAssistente.requestSubmit();

    }

  });


  // =====================================================
  // ESC FECHA O CHAT
  // =====================================================

  document.addEventListener('keydown', (evento) => {

    if (
      evento.key === 'Escape' &&
      chatAssistente.classList.contains('aberto')
    ) {

      fecharChat();

    }

  });

});




const resposta = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body: JSON.stringify({
    mensagem: mensagem
  })
});
