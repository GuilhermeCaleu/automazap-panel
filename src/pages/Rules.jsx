import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Rules() {
  const [rules, setRules] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    gatilhos: "",
    resposta_texto: "",
    link_checkout: "",
    perguntar_nome: false,
    perguntar_telefone: false,
    ativa: true,
  });

  async function loadRules() {
    const res = await axios.get(`${API_URL}/api/rules`);
    setRules(res.data);
  }

  useEffect(() => {
    loadRules();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      gatilhos: form.gatilhos
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
    };
    await axios.post(`${API_URL}/api/rules`, payload);
    setForm({
      nome: "",
      gatilhos: "",
      resposta_texto: "",
      link_checkout: "",
      perguntar_nome: false,
      perguntar_telefone: false,
      ativa: true,
    });
    loadRules();
  }

  return (
    <div>
      <h1>Regras do Bot</h1>
      <p>Crie regras para responder automaticamente baseado em palavras-chave.</p>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>Nome da regra</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Regra ebook"
          />
        </div>
        <div className="form-group">
          <label>Gatilhos (separados por vírgula)</label>
          <input
            type="text"
            name="gatilhos"
            value={form.gatilhos}
            onChange={handleChange}
            placeholder="oi, olá, ebook, 1"
          />
        </div>
        <div className="form-group">
          <label>Resposta do bot</label>
          <textarea
            name="resposta_texto"
            value={form.resposta_texto}
            onChange={handleChange}
            placeholder="Texto que o bot vai responder"
          />
        </div>
        <div className="form-group">
          <label>Link de checkout (opcional)</label>
          <input
            type="text"
            name="link_checkout"
            value={form.link_checkout}
            onChange={handleChange}
            placeholder="https://seu-checkout.com/ebook"
          />
        </div>
        <div className="form-group row">
          <label>
            <input
              type="checkbox"
              name="perguntar_nome"
              checked={form.perguntar_nome}
              onChange={handleChange}
            />
            Perguntar nome
          </label>
          <label>
            <input
              type="checkbox"
              name="perguntar_telefone"
              checked={form.perguntar_telefone}
              onChange={handleChange}
            />
            Perguntar telefone
          </label>
          <label>
            <input
              type="checkbox"
              name="ativa"
              checked={form.ativa}
              onChange={handleChange}
            />
            Regra ativa
          </label>
        </div>
        <button type="submit">Salvar regra</button>
      </form>

      <h2>Regras cadastradas</h2>
      <div className="list">
        {rules.map((rule) => (
          <div key={rule.id} className="card">
            <h3>{rule.nome}</h3>
            <p>
              <strong>Gatilhos:</strong> {rule.gatilhos?.join(", ")}
            </p>
            <p>
              <strong>Resposta:</strong> {rule.resposta_texto}
            </p>
            {rule.link_checkout && (
              <p>
                <strong>Checkout:</strong> {rule.link_checkout}
              </p>
            )}
            <p>
              Perguntar nome: {rule.perguntar_nome ? "Sim" : "Não"} | Perguntar telefone:{" "}
              {rule.perguntar_telefone ? "Sim" : "Não"}
            </p>
            <p>Status: {rule.ativa === false ? "Inativa" : "Ativa"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rules;
