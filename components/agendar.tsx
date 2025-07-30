
import { useState } from 'react';
import Calendario from '../components/Calendario';

export default function Agendar() {
  const [numeroNota, setNumeroNota] = useState('');
  const [nomeSolicitante, setNomeSolicitante] = useState('');
  const [localidade, setLocalidade] = useState('CRICIUMA');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [periodo, setPeriodo] = useState('MANHA');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/agendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numeroNota,
        nomeSolicitante,
        localidade,
        data: dataSelecionada,
        periodo
      })
    });

    const data = await res.json();
    setMensagem(data.message || 'Erro ao agendar');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Agendar Inspeção</h1>
      <form onSubmit={handleSubmit}>
        <label>Número da Nota:</label>
        <input
          type="text"
          value={numeroNota}
          onChange={(e) => setNumeroNota(e.target.value)}
          required
        />

        <label>Nome do Solicitante:</label>
        <input
          type="text"
          value={nomeSolicitante}
          onChange={(e) => setNomeSolicitante(e.target.value)}
          required
        />

        <label>Localidade:</label>
        <select value={localidade} onChange={(e) => setLocalidade(e.target.value)}>
          <option value="CRICIUMA">Criciúma</option>
          <option value="ARARANGUA">Araranguá</option>
        </select>

        <label>Data da Inspeção:</label>
        <Calendario
          localidade={localidade}
          onDataSelecionada={(data) => setDataSelecionada(data)}
        />

        <label>Período:</label>
        <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
          <option value="MANHA">Manhã</option>
          <option value="TARDE">Tarde</option>
        </select>

        <button type="submit">Agendar</button>
      </form>

      {mensagem && <p style={{ marginTop: 20 }}>{mensagem}</p>}
    </div>
  );
}
