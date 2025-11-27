document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("resultsContainer");

  // Pega o termo da URL (?q=...)
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  if (!query || query.trim() === "") {
    container.innerHTML = "<p>Nenhuma busca informada.</p>";
    return;
  }

  // Chamada para a API
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!data.meals) {
        container.innerHTML = `<p>Nenhuma receita encontrada para "<strong>${query}</strong>"</p>`;
        return;
      }

      container.innerHTML = "";

      data.meals.forEach(meal => {
        const card = `
          <div class="col-12 col-md-6 col-lg-3 mb-4">
            <div class="card h-100">
              <img
                src="${meal.strMealThumb}"
                class="card-img-top"
                alt="${meal.strMeal}"
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${meal.strMeal}</h5>

                <p class="card-text">
                  <strong>Categoria:</strong> ${meal.strCategory}<br>
                  <strong>Origem:</strong> ${meal.strArea}
                </p>

                <p class="card-text small text-muted">
                  ${meal.strInstructions.substring(0, 100)}...
                </p>

                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <a href="recipe.html?id=${meal.idMeal}" class="btn btn-primary flex-grow-1 me-2">
                    Ver receita
                  </a>

                  <button class="btn btn-outline-danger btn-square" title="Favoritar">
                    <i class="bi bi-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
        container.innerHTML += card;
      });
    })
    .catch(err => {
      console.error("Erro ao buscar receitas:", err);
      container.innerHTML = "<p>Erro ao carregar resultados.</p>";
    });
});