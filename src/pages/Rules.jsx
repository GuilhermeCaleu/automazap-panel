import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";

function Rules() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    triggers: "",
    response: "",
  });

  async function loadRules() {
    try {
      setLoading(true);
      const data = await apiGet("/api/rules");
      setRules(data || []);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar regras.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRules();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        name: form.name,
        triggers: form.triggers
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        response: form.response,
      };
      await apiPost("/api/rules", payload);
      setForm({ name: "", triggers: "", response: "" });
      loadRules();
    } catch (err) {
      console.error(err);
      setError("Erro ao salvar regra.");
    }
  }

  return (
    <div>
      <h1>Regras do Bot</h1>
      <p>Configure respostas automáticas baseadas em gatilhos.</p>

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>Nome da regra</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex: Regra ebook"
          />
        </div>
        <div className="form-group">
          <label>Gatilhos (separados por vírgula)</label>
          <input
            type="text"
            name="triggers"
            value={form.triggers}
            onChange={handleChange}
            placeholder="ebook, oi, 1"
          />
        </div>
        <div className="form-group">
          <label>Resposta</label>
          <textarea
            name="response"
            value={form.response}
            onChange={handleChange}
            placeholder="Texto que o bot vai responder"
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Salvar regra</button>
      </form>

      <h2>Regras cadastradas</h2>
      {loading && <p>Carregando...</p>}
      {!loading && rules.length === 0 && (
        <p>Nenhuma regra cadastrada ainda.</p>
      )}
      <div className="list">
        {rules.map((r, idx) => (
          <div key={idx} className="card">
            <h3>{r.name || `Regra #${r.id}`}</h3>
            <p>
              <strong>Gatilhos:</strong>{" "}
              {Array.isArray(r.triggers) ? r.triggers.join(", ") : ""}
            </p>
            <p>
              <strong>Resposta:</strong> {r.response || r.regra}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rules;
