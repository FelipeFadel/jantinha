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

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.querySelector("#nomeInput").value;
  const bio = document.querySelector("#bioInput").value;

  console.log("Nome:", nome);
  console.log("Bio:", bio);
});
