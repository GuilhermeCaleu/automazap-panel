import React from "react";

function Settings() {
  return (
    <div>
      <h1>Configurações</h1>
      <p>
        Nesta versão PRO base, a configuração de tokens e IDs do WhatsApp
        é feita no backend (.env / variáveis do Render).
      </p>
      <p>
        Você pode evoluir esta tela para permitir que cada cliente cadastre
        seu próprio token, número e regras de disparo.
      </p>
    </div>
  );
}

export default Settings;
