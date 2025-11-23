import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  async function loadContacts() {
    const res = await axios.get(`${API_URL}/api/contacts`);
    setContacts(res.data);
  }

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div>
      <h1>Contatos</h1>
      <p>Aqui você vê os leads capturados automaticamente pelo bot.</p>
      <div className="list">
        {contacts.map((c) => (
          <div key={c.id} className="card">
            <p>
              <strong>Número:</strong> {c.numero}
            </p>
            <p>
              <strong>Nome:</strong> {c.nome || "Não informado"}
            </p>
            <p>
              <strong>Telefone salvo:</strong> {c.telefone}
            </p>
            <p>
              <small>Criado em: {c.criadoEm}</small>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
