const API_URL = "https://autozap-backend.onrender.com"; // coloque depois a URL do backend aqui

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  return response.json();
}
