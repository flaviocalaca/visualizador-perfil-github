export function renderProfile(userData, userRepos, container, currentPage) {
  let reposHTML = "";
  
  // Calculando se existe uma próxima página baseada no total de repositórios públicos
  const totalRepos = userData.public_repos;
  const totalPages = Math.ceil(totalRepos / 10);
  const hasNextPage = currentPage < totalPages;

  if (userRepos && userRepos.length > 0) {
    reposHTML = `
      <div class="profile-repositories">
        <h2>Últimos Repositórios (${totalRepos})</h2>

        <div class="repositories">
          ${userRepos
            .map(
              (repo) => `
              <a href="${repo.html_url}" target="_blank">
                <div class="repository-card">
                  <h3>${repo.name}</h3>
                  <p>${repo.description || "Sem descrição 😥"}</p>

                  <div class="repository-stats">
                    <span>⭐ Stars: ${repo.stargazers_count}</span>
                    <span>🍴 Forks: ${repo.forks_count}</span>
                    <span>👀 Watchers: ${repo.watchers_count}</span>
                    <span>💻 Language: ${repo.language || "Não informada"}</span>
                  </div>
                </div>
              </a>
            `
            )
            .join("")}
        </div>
        
        <div class="pagination">
          <p>Página ${currentPage} de ${totalPages || 1}</p>
          <div class="pagination-buttons">
            <button id="btn-prev" ${currentPage === 1 ? "disabled" : ""}>Anterior</button>
            <button id="btn-next" ${!hasNextPage ? "disabled" : ""}>Próximo</button>
          </div>
        </div>
      </div>
    `;
  } else {
    reposHTML = `<p class="no-repos">Este usuário não possui repositórios públicos.</p>`;
  }

  container.innerHTML = `
    <div class="profile-card">
      <img src="${userData.avatar_url}" alt="Avatar de ${userData.name || userData.login}" class="profile-avatar">

      <div class="profile-info">
        <!-- Se não tiver nome, mostra o login (o @ do usuário) -->
        <h2>${userData.name || userData.login}</h2>
        <p>${userData.bio || "Não possui bio cadastrada 😢."}</p>
      </div>
    </div>

    <div class="profile-counters">
      <div class="followers">
        <h4>👥 Seguidores</h4>
        <span>${userData.followers}</span>
      </div>
      <div class="following">
        <h4>👤 Seguindo</h4>
        <span>${userData.following}</span>
      </div>
    </div>

    ${reposHTML}
  `;
}
