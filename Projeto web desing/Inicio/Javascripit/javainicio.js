document.addEventListener('DOMContentLoaded', () => {

  // ===== Scroll reveal animation =====
  const elementosReveal = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('ativo');
          observer.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });

    elementosReveal.forEach((el) => observer.observe(el));
  }

  // ===== Função genérica para os painéis de objetivo =====
  function configurarPainel(idBotao, idPainel, textoAberto, textoFechado, conteudoHTML) {
    const botao = document.getElementById(idBotao);
    const painel = document.getElementById(idPainel);

    if (!botao) {
      console.error(`Botão não encontrado: #${idBotao}`);
      return;
    }

    if (!painel) {
      console.error(`Painel não encontrado: #${idPainel}`);
      return;
    }

    botao.addEventListener('click', () => {
      const estaAberto = painel.classList.contains('aberto');

      if (estaAberto) {
        painel.classList.remove('aberto');
        painel.innerHTML = '';
        botao.textContent = textoFechado;
      } else {
        painel.innerHTML = conteudoHTML;
        painel.classList.add('aberto');
        botao.textContent = textoAberto;
      }
    });
  }

  configurarPainel(
    'invocardragao',
    'barrainfo',
    'Remover',
    'Clique para saber o objetivo 1',
    `<h3>Objetivo 1</h3>
     <hr>
     <p>Nosso objetivo 1 é o principal, porque tem coisas importantes a se cumprir, como:</p>
     <ul>
       <li>Cumprir a meta financeira</li>
       <li>Bater a meta de colaboradores</li>
       <li>Agradecer os parceiros</li>
     </ul>
     <p>Esses são os nossos maiores objetivos, como os próximos.</p>`
  );

  configurarPainel(
    'botaodainvocacaaos',
    'barrainfo2',
    'Remover',
    'Aparecer',
    `<h3>Objetivo 2</h3>
     <hr>
     <p>Nosso segundo objetivo é conseguir mais colaboradores e realizar um excelente serviço com a saúde mental dos nossos clientes.</p>
     <p>Queremos mais sucesso no mercado e reconhecimento do governo do estado.</p>`
  );

  configurarPainel(
    'botaopromaxxx',
    'barrainfo3',
    'Remover',
    'Mostrar informação',
    `<h3>Objetivo 3</h3>
     <hr>
     <p>Nosso terceiro objetivo é expandir nossa equipe de psicólogos parceiros e ampliar o atendimento para novas regiões.</p>`
  );

});
