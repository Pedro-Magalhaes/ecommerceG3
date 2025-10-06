// CARRINHO:

// ------------------- Adicionar ao carrinho ------------------- 

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-carrinho');
  if (!btn) return;

  const nome   = btn.dataset.nome;
  const id     = Number(btn.dataset.id);
  const preco  = Number(btn.dataset.preco);
  const imagem = btn.dataset.imagem;

  adicionarAoCarrinho(nome, id, preco, imagem);
});

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

document.getElementById("removerTodos").onclick = () => {
  // esvazia o carrinho
  localStorage.removeItem("carrinho");
  
  // renderiza novamente a tela do carrinho
  renderCarrinho();
};

// ------------------- Finalizar compra ------------------- 

document.getElementById("finalizar").onclick = () => {
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

// FAVORITOS:

// ------------------- Adicionar aos favoritos ------------------- 

document.addEventListener('click', (e) => {

  
  const btn = e.target.closest('.btn-favoritos');
  if (!btn) return;

  const nome   = btn.dataset.nome;
  const id     = Number(btn.dataset.id);
  const preco  = Number(btn.dataset.preco);
  const imagem = btn.dataset.imagem;

  adicionarAFavoritos(nome, id, preco, imagem);
});

// BUSCA:

document.getElementById('search-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // evitar comportamento padrão (ex: submit)
    document.getElementById('search-button').click(); // dispara o clique no botão
  }
});

document.getElementById('search-button').addEventListener('click', buscarProduto);

async function buscarProduto() {
  document.getElementById('cate').style.display = 'none';
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = '<p>Carregando...</p>';
  const termo = document.getElementById('search-input').value.toLowerCase();

  try {
    const response = await fetch('../model/produtos.json');
    const dados = await response.json(); // dados = { produtos: [...] }

    const produtos = dados.produtos;

    const resultados = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo)
    );

    resultadoDiv.innerHTML = '';

    if (resultados.length === 0) {
      resultadoDiv.innerHTML = '<p class="nenhumproduto">Nenhum produto encontrado.</p>';
      return;
    }

    resultados.forEach(produto => {
      const div = document.createElement('div');
      div.classList.add('item');
      div.innerHTML = `
  <img src="${produto.imagem}" alt="${produto.nome}" style="width: 150px;">
  <h3>${produto.nome}</h3>
  <p>${produto.descricao}</p>
  <p>Preço: R$ ${produto.preco.toFixed(2)}</p>

  <button 
    class="btn-carrinho" 
    data-nome="${produto.nome}" 
    data-id="${produto.id}" 
    data-preco="${produto.preco}" 
    data-imagem="${produto.imagem}">
    Adicionar ao Carrinho
  </button>

  <button 
    class="btn-favoritos" 
    data-nome="${produto.nome}" 
    data-id="${produto.id}" 
    data-preco="${produto.preco}" 
    data-imagem="${produto.imagem}">
    Adicionar aos Favoritos
  </button>

  <hr>
`;
      resultadoDiv.appendChild(div);
    });
  } catch (error) {
    resultadoDiv.innerHTML = '<p class="erro">Erro ao carregar botões.</p>';
    console.error('Erro ao buscar produtos:', error);
  }
}
