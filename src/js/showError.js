export function showError(error, container) {
  console.error("Erro:", error);
  container.innerHTML = `
    <div class="error-container">
      <p class="error-message">${error.message}</p>
      <button onclick="window.location.reload()" class="btn-retry" style="margin-top: 20px; padding: 10px 20px; cursor: pointer; background: #6e5494; color: white; border: none; border-radius: 5px;">Tentar novamente</button>
    </div>
  `;
}
