const BASE_URL = "https://api.github.com";

export async function getUser(userName) {
  const response = await fetch(`${BASE_URL}/users/${userName}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Usuário não encontrado 🔍");
    }
    if (response.status === 403) {
      throw new Error("Limite de buscas atingido. Tente novamente mais tarde! ⏳");
    }
    throw new Error("Erro ao buscar usuário no GitHub ❌");
  }

  return response.json();
}

export async function getRepos(userName, page = 1) {
  const response = await fetch(
    `${BASE_URL}/users/${userName}/repos?per_page=10&sort=updated&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar os repositórios ❌");
  }

  return response.json();
}
