function cliques() {
  const tela = document.querySelector("#tela");
  const paragrafo = document.querySelector("#para");

  document.addEventListener("keydown", (e) => {
    e.preventDefault();
    tela.innerHTML = e.key;
  });
}

cliques();
