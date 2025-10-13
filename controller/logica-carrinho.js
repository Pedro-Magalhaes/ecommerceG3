//  ------- Aumentar e diminuir quantidades ------- 

document.addEventListener('click', (e) => {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Aumentar quantidade
  if (e.target.classList.contains('btn-aumentar')) {
    const idx = Number(e.target.dataset.index);
    carrinho[idx].quantidade = (carrinho[idx].quantidade || 1) + 1;
  }

  // Diminuir quantidade
  if (e.target.classList.contains('btn-diminuir')) {
    const idx = Number(e.target.dataset.index);
    if ((carrinho[idx].quantidade || 1) > 1) {
      carrinho[idx].quantidade -= 1;
    } else {
      // Se quantidade chega a 0, remove do carrinho
      carrinho.splice(idx, 1);
    }
  }

  // Remover completamente
  if (e.target.classList.contains('btn-remover')) {
    const idx = Number(e.target.dataset.index);
    carrinho.splice(idx, 1);
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderCarrinho();
});

// ----------------- Remover todos -----------------

const btnRemover = document.getElementById("removerTodos");
if (btnRemover) {
  btnRemover.onclick = () => {
    localStorage.removeItem("carrinho");
    renderCarrinho();
  };
}
// ------------------- Finalizar compra ------------------- 

const btnFinalizar = document.getElementById("finalizar");

if (btnFinalizar) {
  btnFinalizar.onclick = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioAtual"));

    if (usuario) {
      // Se o usuário estiver logado
      alert("Compra concluída com sucesso, obrigada por comprar conosco!");
      localStorage.removeItem("carrinho"); // esvazia o carrinho
      renderCarrinho(); // atualiza a tela
    } else {
      // Se NÃO estiver logado → manda para cadastro
      alert("É necessário se cadastrar para finalizar sua compra!");
      window.location.href = "login.html";
    }
  };
}