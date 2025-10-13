// ------------------- Renderiza o carrinho ------------------- 

function renderCarrinho() {
  const div = document.getElementById('listaCarrinho');
  if (!div) return;
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (carrinho.length === 0) {
    div.innerHTML = `
      <div class="msg-vazio">
        <p>Oops... parece que seu carrinho está vazio!</p>
        <a href="index.html" class="btn-voltar">Ver produtos</a>
      </div>
    `;
    document.getElementById('total').textContent = "Total: R$ 0,00";

    const btn = document.getElementById('finalizar');
    if (btn) btn.style.display = 'none';
    const tc = document.querySelector('.total-container');
    if (tc) tc.style.display = 'none';
    const btnR= document.getElementById('removerTodos');
    if(btnR) btnR.style.display='none';
    return;
  }

  div.innerHTML = carrinho.map((item, i) => `
    <div class="item-carrinho">
      <img class="img-carrinho" src="${item.imagem}" width="100" alt="${item.nome}">
      <p class="tit-carrinho">${item.nome} - R$ ${item.preco}</p>
      <div class="controle-quantidade">
        <button class="btn-diminuir" data-index="${i}">-</button>
        <span class="quantidade">${item.quantidade||1}</span>
        <button class="btn-aumentar" data-index="${i}">+</button>
      </div>
      <button class="btn-remover" data-index="${i}" aria-label="Remover ${item.nome}">
        Remover
      </button>
    </div>
  `).join('');

  const total = carrinho.reduce((soma, item) => soma + Number(item.preco || 0) * (item.quantidade || 1), 0);
  document.getElementById('total').textContent = "Total: R$ " + total.toFixed(2);
}

window.addEventListener('load', () => {
  if (document.getElementById("carrinho-container")) {
    renderCarrinho();
  }
});