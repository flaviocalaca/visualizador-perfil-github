export async function getUser(userName) {
  const BASE_URL = "https://api.github.com";
  const response = await fetch(`${BASE_URL}/users/${userName}`);

  if (!response.ok) {
    throw new Error("Usuário não encontrado");
  }

  return response.json();
}

export async function getRepos(userName) {
  const BASE_URL = "https://api.github.com";
  const response = await fetch(
    `${BASE_URL}/users/${userName}/repos?per_page=10&sort=updated`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar repositórios");
  }

  return response.json();
}
