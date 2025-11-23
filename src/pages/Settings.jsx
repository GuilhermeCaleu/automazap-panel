import React from "react";

function Settings() {
  return (
    <div>
      <h1>Configurações</h1>
      <p>
        Nesta versão, as configurações de token e phone id do WhatsApp são feitas diretamente no
        arquivo <code>.env</code> do backend.
      </p>
      <p>
        Em versões futuras, isso poderá ser feito diretamente por aqui com integração mais
        avançada.
      </p>
    </div>
  );
}

export default Settings;
