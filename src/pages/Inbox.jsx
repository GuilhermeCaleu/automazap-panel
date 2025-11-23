import { useEffect, useState } from "react";
import apiRequest from "../services/api";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar mensagens ao carregar a página
  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await apiRequest("/messages"); // Endpoint do backend
        setMessages(data);
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📥 Inbox</h2>

      {loading ? (
        <p>Carregando mensagens...</p>
      ) : messages.length === 0 ? (
        <p>Nenhuma mensagem encontrada.</p>
      ) : (
        <ul>
          {messages.map((msg, i) => (
            <li key={i} style={{ marginBottom: "10px" }}>
              <strong>{msg.from}</strong>: {msg.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
