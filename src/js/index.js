import { getUser, getRepos } from "./githubApi.js";
import { renderProfile } from "./renderProfile.js";
import { showError } from "./showError.js";

const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const profileResults = document.querySelector(".profile-results");

btnSearch.addEventListener("click", async () => {
  const userName = inputSearch.value;

  if (!userName) {
    alert("Por favor, digite um nome de usuário do GitHub.");
    profileResults.innerHTML = "";
    return;
  }

  profileResults.innerHTML = `<p class="loading">Carregando...</p>`;

  try {
    const [userData, userRepos] = await Promise.all([
      getUser(userName),
      getRepos(userName),
    ]);
    renderProfile(userData, userRepos, profileResults);
  } catch (error) {
    showError(error, profileResults);
  }
});
