import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const ok = await onLogin(username, password);
    if (!ok) {
      setError("Usuário ou senha inválidos");
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>AutomaZap PRO</h1>
        <p className="login-subtitle">
          Entre com sua conta para acessar o painel.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="primary-btn">
            Entrar
          </button>
        </form>
        <p className="login-hint">
          Versão PRO local – autenticação simples apenas neste navegador.
        </p>
      </div>
    </div>
  );
}

export default Login;
