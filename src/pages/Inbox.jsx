import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMessages() {
      try {
        setLoading(true);
        const data = await apiGet("/api/messages");
        setMessages(data || []);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar mensagens.");
      } finally {
        setLoading(false);
      }
    }
    loadMessages();
  }, []);

  return (
    <div>
      <h1>Inbox</h1>
      <p>Lista de mensagens recebidas (mock / exemplo).</p>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && messages.length === 0 && (
        <p>Nenhuma mensagem encontrada.</p>
      )}
      <div className="list">
        {messages.map((m, idx) => (
          <div key={idx} className="card">
            <p>
              <strong>De:</strong> {m.from}
            </p>
            <p>{m.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inbox;
