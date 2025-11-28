const container = document.getElementById("lista-favoritos");

async function carregarFavoritos() {
  try {
    const response = await fetch("http://localhost:3000/favoritos");
    const favoritos = await response.json();

    // Se não tiver favoritos mostrar uma mensagem
    if (!favoritos || favoritos.length === 0) {
      container.innerHTML = `
        <div class="text-center mt-5">
          <h4>Você ainda não tem receitas por aqui...</h4>
          <p>Use nossa barra de pesquisa e adicione algumas, pesquisas em inglês ein!</p>
        </div>
      `;
      return;
    }

    renderizarCards(favoritos);

  } catch (error) {
    console.error("Erro ao carregar favoritos, ", error);

    container.innerHTML = `
      <div class="text-center mt-5 text-danger">
        <h5>Erro ao carregar seus favoritos.</h5>
        <p>Verifique se o JSON Server está rodando.</p>
      </div>
    `;
  }
}

//Essa função segue a mesma do buscar, favoritos é a lista de receitas em db.json
function renderizarCards(favoritos) {
  container.innerHTML = "";

    // O forEach percorre todos os elementos de favoritos renderizando seus cards e para isso criando novos divs
  favoritos.forEach(meal => {
    const col = document.createElement("div");
    col.classList.add("col-12", "col-md-6", "col-lg-3", "mb-4");

    col.innerHTML = `
      <div class="card h-100">
        <img src="${meal.imagem}" class="card-img-top" alt="${meal.titulo}">
        
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-truncate">${meal.titulo}</h5>
          <p class="card-text"><strong>Categoria:</strong> ${meal.categoria}</p>

          <div class="mt-auto d-flex justify-content-between align-items-center">
            <a href="recipe.html?id=${meal.idMeal}" class="btn btn-primary flex-grow-1 me-2">
              Ver receita
            </a>

            <button 
              class="btn btn-outline-danger btn-square btn-remover"
              data-id="${meal.id}">
              <i class="bi bi-heart-fill text-white"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  adicionarEventosRemover();
}

// Listener para quando clicar o botão de remover, no caso clicar no coração ja prenchido
function adicionarEventosRemover() {
  const botoes = document.querySelectorAll(".btn-remover");

  botoes.forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      // Utilizamos um metodo delete pra remover aquele documentos do nosso json
      try {
        const response = await fetch(`http://localhost:3000/favoritos/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) {
          throw new Error("Erro ao remover favorito");
        }

        carregarFavoritos();

      } catch (error) {
        console.error("Erro ao remover:", error);
        alert("Erro ao remover favorito!");
      }
    });
  });
}

// Chamar quando carregar a pagina para mostrar os favoritos
document.addEventListener("DOMContentLoaded", () => {
  carregarFavoritos();
});
