import { getUser } from "./githubApi.js";
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
    const userData = await getUser(userName);
    renderProfile(userData, profileResults);
  } catch (error) {
    showError(error, profileResults);
  }
});
