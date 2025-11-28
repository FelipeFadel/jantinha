document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("resultsContainer");
  const badge = document.querySelector(".badge");

  let favoritos = await buscarFavoritos(); 
  let totalFavoritos = favoritos.length;
  badge.textContent = totalFavoritos;

  let idsFavoritos = favoritos.map(fav => String(fav.idMeal));

  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  if (!query || query.trim() === "") {
    container.innerHTML = "<p>Nenhuma busca informada.</p>";
    return;
  }

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    if (!data.meals) {
      container.innerHTML = `<p>Nenhuma receita encontrada para "<strong>${query}</strong>"</p>`;
      return;
    }

    container.innerHTML = "";

    // renderiza cards
    data.meals.forEach(meal => {
      const id = meal.idMeal;
      const jaFavorito = idsFavoritos.includes(String(id));

      const card = document.createElement("div");
      card.className = "col-12 col-md-6 col-lg-3 mb-4";
      card.innerHTML = `
        <div class="card h-100">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">
              <strong>Categoria:</strong> ${meal.strCategory}<br>
              <strong>Origem:</strong> ${meal.strArea}
            </p>
            <p class="card-text small text-muted">
              ${meal.strInstructions ? meal.strInstructions.substring(0, 100) + "..." : ""}
            </p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <a href="recipe.html?id=${id}" class="btn btn-primary flex-grow-1 me-2">Ver receita</a>

              <button 
                class="btn btn-outline-danger btn-square btn-favoritar"
                data-id="${id}"
                aria-pressed="${jaFavorito ? "true" : "false"}"
                title="${jaFavorito ? "Remover favorito" : "Adicionar favorito"}"
              >
                <i class="bi ${jaFavorito ? "bi-heart-fill text-white" : "bi-heart"}"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    container.addEventListener("click", async (e) => {
      const btn = e.target.closest(".btn-favoritar");
      if (!btn) return;

      const idMeal = btn.dataset.id;
      const meal = data.meals.find(m => String(m.idMeal) === String(idMeal));
      if (!meal) return;

      if (idsFavoritos.includes(String(idMeal))) {
        try {
          await removerFavorito(idMeal);
          idsFavoritos = idsFavoritos.filter(id => id !== String(idMeal));
          totalFavoritos--;
          badge.textContent = totalFavoritos;

          btn.innerHTML = `<i class="bi bi-heart"></i>`;
          btn.setAttribute("aria-pressed", "false");
          btn.title = "Adicionar favorito";
        } catch (err) {
          console.error("Erro ao remover favorito:", err);
        }
        return;
      }

      // se nao for um favorito ja adiciona
      try {
        await salvarFavorito(meal);
        idsFavoritos.push(String(idMeal));
        totalFavoritos++;
        badge.textContent = totalFavoritos;

        btn.innerHTML = `<i class="bi bi-heart-fill text-white"></i>`;
        btn.setAttribute("aria-pressed", "true");
        btn.title = "Remover favorito";
      } catch (err) {
        console.error("Erro ao salvar favorito:", err);
      }
    });

  } catch (err) {
    console.error("Erro ao buscar receitas:", err);
    container.innerHTML = "<p>Erro ao carregar resultados.</p>";
  }
});

async function salvarFavorito(meal) {
  try {
    const response = await fetch("http://localhost:3000/favoritos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idMeal: meal.idMeal,
        titulo: meal.strMeal,
        imagem: meal.strMealThumb,
        categoria: meal.strCategory
      })
    });

    if (!response.ok) throw new Error("Erro ao salvar essa receita");

    return await response.json();
  } catch (error) {
    console.error("Erro ao salvar:", error);
    throw error;
  }
}

async function buscarFavoritos() {
  try {
    const response = await fetch("http://localhost:3000/favoritos");
    if (!response.ok) return [];
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar favoritos:", err);
    return [];
  }
}

async function removerFavorito(idMeal) {
  try {
    const response = await fetch("http://localhost:3000/favoritos");
    const favoritos = await response.json();
    const favorito = favoritos.find(fav => String(fav.idMeal) === String(idMeal));
    if (!favorito) return;
    const del = await fetch(`http://localhost:3000/favoritos/${favorito.id}`, { method: "DELETE" });
    if (!del.ok) throw new Error("Erro ao deletar favorito");
  } catch (err) {
    console.error("Erro ao remover favorito:", err);
    throw err;
  }
}
