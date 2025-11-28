class Preferencias {
  constructor(nome, bio, idade, restricoes, tiposComida, ingredientes) {
    this.nome = nome;
    this.bio = bio;
    this.idade = idade;
    this.restricoes = restricoes;
    this.tiposComida = tiposComida;
    this.ingredientes = ingredientes;
  }
}

// Funcao que gerencia o funcionamento de caracteres na div de bio
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

// Validacao dos minimos de caracteres da bio
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

// Selecao com bases no tipo de comida clicado (via botões)
let tiposSelecionados = [];

document.querySelectorAll(".btn-outline-primary").forEach(btn => {
  btn.addEventListener("click", function () {
    const tipo = btn.innerText;

    if (tiposSelecionados.includes(tipo)) {
      tiposSelecionados = tiposSelecionados.filter(t => t !== tipo);
      btn.classList.remove("active");
    } else {
      tiposSelecionados.push(tipo);
      btn.classList.add("active");
    }
  });
});

// Funcionamento basico do campo de adicionar ingredientes
let ingredientes = [];

const inputIngrediente = document.getElementById("ingredienteInput");
const btnAdd = document.getElementById("addIngrediente");
const listaIngredientes = document.getElementById("listaIngredientes");

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  const valor = inputIngrediente.value.trim();

  if (valor === "" || ingredientes.includes(valor)) return;

  ingredientes.push(valor);
  renderIngredientes();
  inputIngrediente.value = "";
});

function renderIngredientes() {
  listaIngredientes.innerHTML = "";

  ingredientes.forEach((item, index) => {
    const tag = document.createElement("span");
    tag.className = "badge bg-primary p-2 cursor-pointer";
    tag.textContent = item;

    tag.addEventListener("click", () => {
      ingredientes.splice(index, 1);
      renderIngredientes();
    });

    listaIngredientes.appendChild(tag);
  });
}

// Prenchimento do formulario
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

  const restricoes = {
    veg: document.getElementById("veg").checked,
    vegan: document.getElementById("vegan").checked,
    gluten: document.getElementById("gluten").checked,
    lactose: document.getElementById("lactose").checked,
    seafood: document.getElementById("seafood").checked
  };

  const preferencias = new Preferencias(
    nome,
    bio,
    idade,
    restricoes,
    tiposSelecionados,
    ingredientes
  );

  localStorage.setItem("dadosPessoa", JSON.stringify(preferencias));

  carregarDadosLocalStorage();

  Swal.fire({
    title: "Deu tudo certo!",
    text: "Seus dados foram salvos...",
    icon: "success",
    confirmButtonText: "Ok"
  });
});

// Funcao para carregar os dados no local storage
function carregarDadosLocalStorage() {
  const dadosSalvos = localStorage.getItem("dadosPessoa");

  if (!dadosSalvos) {
    document.getElementById("saudacao").innerText = "Olá, usuário!";
    document.querySelector("#resultado").innerHTML = "";
    return;
  }

  const pessoa = JSON.parse(dadosSalvos);

  // Joga os valores salvos nos inputs
  document.querySelector("#nomeInput").value = pessoa.nome;
  document.querySelector("#bioInput").value = pessoa.bio;
  document.querySelector("#idadeInput").value = pessoa.idade;

  // Joga o numero correto na contagem de caracteres de biko
  document.getElementById("bioCount").textContent =
    pessoa.bio.length + "/300";

  document.getElementById("saudacao").innerText =
    `Olá, ${pessoa.nome}!`;

  // Puxa os dados de restricao
  document.getElementById("veg").checked = pessoa.restricoes.veg;
  document.getElementById("vegan").checked = pessoa.restricoes.vegan;
  document.getElementById("gluten").checked = pessoa.restricoes.gluten;
  document.getElementById("lactose").checked = pessoa.restricoes.lactose;
  document.getElementById("seafood").checked = pessoa.restricoes.seafood;

  // Puxa o tipo de comida
  tiposSelecionados = pessoa.tiposComida || [];

  document.querySelectorAll(".btn-outline-primary").forEach(btn => {
    if (tiposSelecionados.includes(btn.innerText)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Puxa os ingredientes salvos
  ingredientes = pessoa.ingredientes || [];
  renderIngredientes();

  // Coloca tudo na div resultados
  document.querySelector("#resultado").innerHTML = `
    <h3>Dados cadastrados:</h3>
    <p><strong>Nome:</strong> ${pessoa.nome}</p>
    <p><strong>Bio:</strong> ${pessoa.bio}</p>
    <p><strong>Idade:</strong> ${pessoa.idade}</p>

    <p><strong>Restrições:</strong> ${
      Object.keys(pessoa.restricoes)
      .filter(k => pessoa.restricoes[k])
      .join(", ") || "Nenhuma"
    }</p>

    <p><strong>Tipos Favoritos:</strong> ${
      pessoa.tiposComida.length ? pessoa.tiposComida.join(", ") : "Nenhum"
    }</p>

    <p><strong>Ingredientes:</strong> ${
      pessoa.ingredientes.length ? pessoa.ingredientes.join(", ") : "Nenhum"
    }</p>
  `;
}

// funcao pra limpar tudo com base no botão limpar
const btnLimpar = document.querySelector("#limpar");

btnLimpar.addEventListener("click", function () {
  //Apaga o item dadosPessoa (com todas as preferencias do usuario)
  localStorage.removeItem("dadosPessoa");

  //Limpa todos os campos antes prenchidos
  document.querySelectorAll("input").forEach(campo => campo.value = "");
  document.querySelectorAll("textarea").forEach(text => text.value = "");

  document.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);

  tiposSelecionados = [];
  ingredientes = [];
  listaIngredientes.innerHTML = "";

  document.querySelectorAll(".btn-outline-primary").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById("bioCount").textContent = "0/300";
  document.getElementById("saudacao").innerText = "Olá, usuário!";
  document.querySelector("#resultado").innerHTML = "";
});


$(document).ready(function () {

  const painel = $('#resultado');

  painel.hide();
  painel.slideDown(600);

  $('#idadeInput').mask('00');
});

// Inicializa carregando os dados do local storage
document.addEventListener("DOMContentLoaded", function () {
  carregarDadosLocalStorage();
});
