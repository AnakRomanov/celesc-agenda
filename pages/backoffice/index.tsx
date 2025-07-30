import React, { useState } from 'react';

export default function Backoffice() {
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  const autenticar = () => {
    if (senha === 'admin123') setAutenticado(true);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {!autenticado ? (
        <>
          <h2>Login Backoffice</h2>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button onClick={autenticar}>Entrar</button>
        </>
      ) : (
        <h2>Em breve: tabela com filtros e ações</h2>
      )}
    </div>
  );
}
