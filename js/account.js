//Nosso objeto de Preferencias
class Preferencias {
  constructor(nome, bio, idade) {
    this.nome = nome;
    this.bio = bio;
    this.idade = idade;
  }
}

//Função para mudar o contador de caracteres em bio
(function () {
  const ta = document.getElementById("bioInput");
  const count = document.getElementById("bioCount");
  if (!ta || !count) return;
  const max = ta.getAttribute("maxlength") || 300;
  function update() {
    count.textContent = ta.value.length + "/" + max;
  }
  ta.addEventListener("input", update);
  update();
})();

//Nosso listener de submit do evento do botão
const form = document.getElementById("accountForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.querySelector("#nomeInput").value;
  const bio = document.querySelector("#bioInput").value;
  const idade = document.querySelector("#idadeInput").value;

  const preferencias = new Preferencias(nome, bio, idade);

  //Caso defina um nome, mostrar no campo de saudação
  const saudacaoElement = document.getElementById("saudacao");
  if (nome) {
    saudacaoElement.innerText = `Olá, ${preferencias.nome}!`;
  } else {
    saudacaoElement.innerText = `Olá, usuário!`;
  }

  const divResultado = document.querySelector("#resultado");
  divResultado.innerHTML = `
    <h3>Dados cadastrados:</h3>
    <p><strong>Nome:</strong> ${preferencias.nome}</p>
    <p><strong>Bio:</strong> ${preferencias.bio}</p>
    <p><strong>Idade:</strong> ${preferencias.idade}</p>
  `;
});

const btnLimpar = document.querySelector("#limpar");

btnLimpar.addEventListener("click", function () {
  const campos = document.querySelectorAll("input");
  campos.forEach((campo) => (campo.value = ""));

  const textarea = document.querySelectorAll("textarea");
  textarea.forEach((text) => (text.value = ""));

  document.getElementById("bioCount").textContent = "0/300";

  document.getElementById("saudacao").innerText = "Olá, usuário!";

  document.querySelector("#resultado").innerHTML = "";
});
