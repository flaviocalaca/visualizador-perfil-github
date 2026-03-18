import { getUser, getRepos } from "./githubApi.js";
import { renderProfile } from "./renderProfile.js";
import { showError } from "./showError.js";

const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const profileResults = document.querySelector(".profile-results");

let currentPage = 1;
let currentUserName = "";
let currentUserData = null;

// Função para controlar o estado de "Carregando"
function setLoading(isLoading) {
  if (isLoading) {
    btnSearch.disabled = true;
    btnSearch.value = "Buscando...";
    profileResults.innerHTML = `
      <div class="loader">
        <div class="loader-dot"></div>
        <div class="loader-dot"></div>
        <div class="loader-dot"></div>
      </div>
    `;
  } else {
    btnSearch.disabled = false;
    btnSearch.value = "Buscar";
  }
}

// Função central que busca e renderiza
async function fetchAndRender(userName, page) {
  setLoading(true);
  try {
    let userRepos;
    
    // Se for a primeira busca ou usuário mudou, busca dados do perfil também
    if (!currentUserData || userName !== currentUserName) {
      const [userData, repos] = await Promise.all([
        getUser(userName),
        getRepos(userName, page),
      ]);
      currentUserData = userData;
      userRepos = repos;
    } else {
      // Se for apenas mudança de página, busca apenas os repositórios
      userRepos = await getRepos(userName, page);
    }

    renderProfile(currentUserData, userRepos, profileResults, page);
    currentUserName = userName;
    currentPage = page;
  } catch (error) {
    showError(error, profileResults);
  } finally {
    setLoading(false);
  }
}

async function searchUser() {
  const userName = inputSearch.value.trim();
  if (!userName) {
    profileResults.innerHTML = `<p class="error">Por favor, digite um nome de usuário do GitHub.</p>`;
    return;
  }
  // Reinicia os dados para uma nova busca
  currentUserData = null;
  await fetchAndRender(userName, 1);
}

btnSearch.addEventListener("click", searchUser);

inputSearch.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchUser();
});

profileResults.addEventListener("click", (e) => {
  if (e.target.id === "btn-prev") {
    fetchAndRender(currentUserName, currentPage - 1);
  } else if (e.target.id === "btn-next") {
    fetchAndRender(currentUserName, currentPage + 1);
  }
});
