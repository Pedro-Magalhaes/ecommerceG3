window.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioAtual"));
  const bemVindo = document.getElementById("bem-vindo");

  // Renderiza nome na index
  if (usuario && usuario.nome && bemVindo) {
    const primeiroNome = usuario.nome.split(" ")[0];
    bemVindo.textContent = `Olá, ${primeiroNome}!`;
  }

  // Troca o link do perfil (img dentro de <a>)
  const perfilImg = document.getElementById("perfil");
  if (perfilImg && perfilImg.parentElement) {
    perfilImg.parentElement.setAttribute("href", usuario ? "logout.html" : "login.html");
  }

  // LOGOUT
  const btnLogout = document.querySelector("#btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("usuarioAtual");
      window.location.href = "index.html";
    });
  }

  // CADASTRO
  const formCadastro = document.querySelector(".form-cadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(formCadastro);
      const dadosUsuario = Object.fromEntries(formData); // { nome, email, senha, confirmar-senha }

      // Valida confirmação de senha
      if (dadosUsuario.senha !== dadosUsuario["confirmar-senha"]) {
        alert("As senhas não coincidem. Tente novamente.");
        formCadastro.querySelector("#confirmar-senha").value = "";
        formCadastro.querySelector("#confirmar-senha").focus();
        return;
      }

      const regexCEP = /^\d{5}-\d{3}$/;
      if (!regexCEP.test(dadosUsuario.cep)) {
        alert("CEP inválido! Use o formato *****-***.");
        formCadastro.querySelector("#cep").focus();
        return;
      }

      // Remove campo de confirmação antes de salvar
      delete dadosUsuario["confirmar-senha"];

      // Recupera lista de usuários existentes
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Verifica se email já existe
      if (usuarios.some(u => u.email === dadosUsuario.email)) {
        alert("Usuário já existe!");
        return;
      }

      // Adiciona novo usuário
      usuarios.push(dadosUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // Define como usuário logado
      localStorage.setItem("usuarioAtual", JSON.stringify(dadosUsuario));

      window.location.href = "index.html";
    });
  }

  // LOGIN
  const formLogin = document.querySelector(".form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", function(event) {
      event.preventDefault();

      const formData = new FormData(formLogin);
      const dadosLogin = Object.fromEntries(formData); // { email, senha }

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      let usuarioValido = usuarios.find(u => u.email === dadosLogin.email && u.senha === dadosLogin.senha);

      if (usuarioValido) {
        localStorage.setItem("usuarioAtual", JSON.stringify(usuarioValido));
        window.location.href = "index.html";
      } else {
        alert("Email ou senha incorretos!");
      }
    });
  }
});
