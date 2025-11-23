import React, { useEffect, useState } from "react";
import { apiGet } from "../services/api";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadContacts() {
      try {
        setLoading(true);
        const data = await apiGet("/api/contacts");
        setContacts(data || []);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar contatos.");
      } finally {
        setLoading(false);
      }
    }
    loadContacts();
  }, []);

  return (
    <div>
      <h1>Contatos</h1>
      <p>Leads e clientes que já interagiram com seu número.</p>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && contacts.length === 0 && (
        <p>Nenhum contato encontrado.</p>
      )}
      <div className="list">
        {contacts.map((c, idx) => (
          <div key={idx} className="card">
            <p>
              <strong>Nome:</strong> {c.name || "Não informado"}
            </p>
            <p>
              <strong>Número:</strong> {c.number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
