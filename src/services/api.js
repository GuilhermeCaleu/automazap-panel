import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiGet(path) {
  const res = await axios.get(`${API_URL}${path}`);
  return res.data;
}

export async function apiPost(path, body) {
  const res = await axios.post(`${API_URL}${path}`, body);
  return res.data;
}
