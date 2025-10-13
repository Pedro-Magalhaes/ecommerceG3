// CARRINHO:

// ------------------- Salvar produtos no carrinho ------------------- 

function adicionarAoCarrinho(nome, id, preco, imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Procura se o produto já está no carrinho
  let produtoExistente = carrinho.find(item => item.id === id);

  if (produtoExistente) {
    // Se já existe, aumenta a quantidade
    produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
  } else {
    // Se não existe, adiciona novo item com quantidade 1
    let produto = {
      id: id,
      nome: nome,
      imagem: imagem,
      preco: preco,
      quantidade: 1
    };
    carrinho.push(produto);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
  alert(nome + " foi adicionado ao carrinho!");
}

// --------------- Atualizar valor total do carrinho ---------------- 

function atualizarTotal() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let total = carrinho.reduce((soma, item) => soma + Number(item.preco || 0), 0);

  const totalElem = document.getElementById('total');
  if (totalElem) {
    totalElem.textContent = "Total: R$ " + total.toFixed(2);
  }
}

  // Chama ao carregar
  window.addEventListener('load', atualizarTotal);

// FAVORITOS:

// ------------------- Salvar produtos nos favoritos ------------------- 

function adicionarAFavoritos(nome, id, preco, imagem) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
 const usuario = JSON.parse(localStorage.getItem("usuarioAtual"));

  if (!usuario) {
    alert("É necessário estar logado para adicionar aos favoritos!");
    window.location.href = "login.html";
    return;
  }

  const jaExiste = favoritos.some(item => item.id === id);
  if (jaExiste) {
    alert(nome + " já está na sua lista de favoritos!");
    return;
  }
  else{  
  let produto = {
    id: id,
    nome: nome,
    imagem: imagem,
    preco: preco
  };

  favoritos.push(produto);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  alert(nome + " foi adicionado à lista de favoritos!");
}
}

 