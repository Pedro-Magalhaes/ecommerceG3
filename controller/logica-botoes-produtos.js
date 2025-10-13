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
 document.addEventListener('click', (e) => {
  // Verifica se clicou no botão de carrinho
  const usuario = JSON.parse(localStorage.getItem("usuarioAtual"));
  const btn = e.target.closest('.btn-favoritos');
  if (!btn) return;

  if (usuario) {
    // Se o usuário estiver logado
    const nome   = btn.dataset.nome;
    const id     = Number(btn.dataset.id);
    const preco  = Number(btn.dataset.preco);
    const imagem = btn.dataset.imagem;

    adicionarAFavoritos(nome, id, preco, imagem);
  } else {
    // Se NÃO estiver logado → manda para cadastro
    alert("É necessário estar logado para adicionar ao favoritos!");
    window.location.href = "login.html";
  }
});

document.getElementById('search-button').addEventListener('click', buscarProduto);

async function buscarProduto() {
  document.getElementById('cate').style.display = 'none';
// Pega os elementos, mas só adiciona evento se eles existirem na página
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

if (searchInput && searchButton) {
  // Permite buscar apertando Enter no input
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchButton.click();
    }
  });
// Busca ao clicar no botão
  searchButton.addEventListener('click', buscarProduto);
}
}

 async function buscarProduto() {
  const topElement = document.getElementById('cate');
  const productElement = document.getElementById('produtos-container');

  if (topElement) {
    topElement.style.display = 'none';
  } else if (productElement) {
    productElement.style.display = 'none';
  }

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = '<p>Carregando...</p>';
  const termo = document.getElementById('search-input').value.toLowerCase();

  try {
    const response = await fetch('../model/produtos.json');
    const dados = await response.json();
    let produtos = dados.produtos;

    // 👇 Filtro pela categoria da página, se houver
    if (typeof pagina !== 'undefined' && pagina.toLowerCase() !== "todosprodutos") {
      produtos = produtos.filter(p => p.categoria.toLowerCase() === pagina.toLowerCase());
    }

    // 👇 Filtro pelo termo digitado
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
    resultadoDiv.innerHTML = '<p class="erro">Erro ao carregar produtos.</p>';
    console.error('Erro ao buscar produtos:', error);
  }
}
