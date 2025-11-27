async function salvarFavorito(meal) {
  try {
    const response = await fetch("http://localhost:3000/favoritos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idMeal: meal.idMeal,
        titulo: meal.strMeal,
        imagem: meal.strMealThumb,
        categoria: meal.strCategory
      })
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar essa receita");
    }

    alert("Sua receita foi salva");
  } catch (error) {
    console.error(error);
    alert("Erro ao salvar esta receita");
  }
}