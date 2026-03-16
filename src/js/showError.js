export function showError(error, container) {
  console.error("Erro:", error);
  alert("Ocorreu um erro ao buscar o perfil do usuário.");
  container.innerHTML = "";
}
