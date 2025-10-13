 // produto.js — preenche a página de produto e injeta data-* nos botões
// para o listener delegado global (logica-botoes-produtos.js)

(function () {
  const DATA_URL = "../model/produtos.json"; // ajuste se o seu caminho for outro

  function getIdFromURL() {
    const sp = new URLSearchParams(window.location.search);
    return sp.get("id");
  }

  async function carregarProdutos() {
    const resp = await fetch(DATA_URL);
    if (!resp.ok) throw new Error("Não foi possível carregar os produtos.");
    return resp.json();
  }

  function formatarPreco(preco) {
    if (typeof preco === "number") {
      return `R$ ${preco.toLocaleString("pt-BR")}`;
    }
    return preco || "";
  }

  function preencherCampos(produto) {
    const imgEl = document.getElementById("produto-imagem");
    const nomeEl = document.getElementById("produto-nome");
    const precoEl = document.getElementById("produto-preco");

    if (imgEl) {
      imgEl.src = produto.imagem;
      imgEl.alt = produto.nome;
    }
    if (nomeEl) nomeEl.textContent = produto.nome;
    if (precoEl) precoEl.textContent = formatarPreco(produto.preco);
  }

  // injeta data-* para o listener delegado (.btn-carrinho / .btn-favoritos)
  function prepararBotoes(produto) {
    // Carrinho
    const btnCarrinho = document.getElementById("btn-add-carrinho");
    if (btnCarrinho) {
      btnCarrinho.classList.add("btn-carrinho");
      btnCarrinho.dataset.id = String(produto.id);
      btnCarrinho.dataset.nome = produto.nome;
      btnCarrinho.dataset.preco = String(produto.preco);
      btnCarrinho.dataset.imagem = produto.imagem;
      // NENHUM addEventListener aqui — o delegado global cuida do clique
    }

    // Favoritos (se você tiver o delegado para favoritos)
    const btnFav = document.getElementById("btn-add-fav");
    if (btnFav) {
      btnFav.classList.add("btn-favoritos");
      btnFav.dataset.id = String(produto.id);
      btnFav.dataset.nome = produto.nome;
      btnFav.dataset.preco = String(produto.preco);
      btnFav.dataset.imagem = produto.imagem;
    }
  }

  async function init() {
    try {
      const id = getIdFromURL();
      if (!id) throw new Error("Parâmetro ?id não encontrado na URL.");

      const data = await carregarProdutos();
      // seu JSON pode vir como { produtos: [...] } ou como [...]
      const lista = Array.isArray(data) ? data : (data.produtos || []);
      const produto = lista.find((p) => String(p.id) === String(id));
      if (!produto) throw new Error("Produto não encontrado.");

      preencherCampos(produto);
      prepararBotoes(produto);
    } catch (err) {
      console.error(err);
      const box = document.getElementById("produto-container");
      if (box) box.innerHTML = "<p>Não foi possível carregar o produto.</p>";
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
