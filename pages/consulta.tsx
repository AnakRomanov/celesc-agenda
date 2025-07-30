import React, { useState } from 'react';

export default function Consulta() {
  const [nota, setNota] = useState('');
  const [resultado, setResultado] = useState(null);

  const consultar = async () => {
    const res = await fetch('/api/consultar', {
      method: 'POST',
      body: JSON.stringify({ nota }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setResultado(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Consultar Agendamento</h2>
      <input value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Número da Nota" />
      <button onClick={consultar}>Consultar</button>
      {resultado && <pre>{JSON.stringify(resultado, null, 2)}</pre>}
    </div>
  );
}
