class Preferencias {
  constructor(nome, bio, idade) {
    this.nome = nome;
    this.bio = bio;
    this.idade = idade;
  }
}

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

const form = document.getElementById("accountForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    alert("Por favor, corrija os campos destacados antes de enviar.");
    return;
  }

  const nome = document.querySelector("#nomeInput").value;
  const bio = document.querySelector("#bioInput").value;
  const idade = document.querySelector("#idadeInput").value;

  const preferencias = new Preferencias(nome, bio, idade);

  localStorage.setItem("dadosPessoa", JSON.stringify(preferencias));

  carregarDadosLocalStorage();

  Swal.fire({
    title: "Deu tudo certo!",
    text: "Seus dados foram salvos...",
    icon: "success",
    confirmButtonText: "Okey"
  });
});

function carregarDadosLocalStorage() {
  const dadosSalvos = localStorage.getItem("dadosPessoa");

  if (!dadosSalvos) {
    document.querySelector("#resultado").innerHTML = "";
    document.getElementById("saudacao").innerText = "Olá, usuário!";
    return;
  }

  const pessoa = JSON.parse(dadosSalvos);

  document.querySelector("#nomeInput").value = pessoa.nome;
  document.querySelector("#bioInput").value = pessoa.bio;
  document.querySelector("#idadeInput").value = pessoa.idade;

  document.getElementById("bioCount").textContent =
    pessoa.bio.length + "/300";

  document.getElementById("saudacao").innerText =
    `Olá, ${pessoa.nome}!`;

  document.querySelector("#resultado").innerHTML = `
    <h3>Dados cadastrados:</h3>
    <p><strong>Nome:</strong> ${pessoa.nome}</p>
    <p><strong>Bio:</strong> ${pessoa.bio}</p>
    <p><strong>Idade:</strong> ${pessoa.idade}</p>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  carregarDadosLocalStorage();
});

$(document).ready(function () {
  const painel = $('#resultado'); // div onde os dados aparecem

  painel.hide();

  // Escolha UMA das animações abaixo:
  painel.slideDown(600);     
});

$(document).ready(function () {
  $('#idadeInput').mask('00');
});

const btnLimpar = document.querySelector("#limpar");

btnLimpar.addEventListener("click", function () {
  localStorage.removeItem("dadosPessoa");

  document.querySelectorAll("input").forEach((campo) => campo.value = "");
  document.querySelectorAll("textarea").forEach((text) => text.value = "");

  document.getElementById("bioCount").textContent = "0/300";
  document.getElementById("saudacao").innerText = "Olá, usuário!";
  document.querySelector("#resultado").innerHTML = "";
});

const bioInput = document.querySelector("#bioInput");

bioInput.addEventListener("input", function () {
  const bioSpan = document.querySelector("#erroBio");
  const min = 10;

  if (bioInput.value.length < min) {
    bioSpan.textContent = `Digite pelo menos ${min} caracteres.`;
    bioInput.classList.add("invalido");
  } else {
    bioSpan.textContent = "";
    bioInput.classList.remove("invalido");
  }
});
