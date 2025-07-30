
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Reagendar() {
  const router = useRouter();
  const [numeroNota, setNumeroNota] = useState('');
  const [agendamento, setAgendamento] = useState(null);
  const [novaData, setNovaData] = useState('');
  const [novoPeriodo, setNovoPeriodo] = useState('MANHA');
  const [mensagem, setMensagem] = useState('');
  const [podeReagendar, setPodeReagendar] = useState(false);

  const buscarAgendamento = async () => {
    setMensagem('');
    const res = await fetch('/api/consultar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numeroNota })
    });
    const data = await res.json();
    if (data && data.agendamento) {
      setAgendamento(data.agendamento);
      const hoje = new Date();
      const dataOriginal = new Date(data.agendamento.dataOriginal);
      const diff = await fetch('/api/dias-uteis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inicio: hoje, fim: dataOriginal })
      });
      const { diasUteis } = await diff.json();
      if (data.agendamento.quantidadeReagendamentos >= 1) {
        setMensagem('Este agendamento já foi reagendado uma vez.');
      } else if (diasUteis < 3) {
        setMensagem('Faltam menos de 3 dias úteis para o agendamento original.');
      } else {
        setPodeReagendar(true);
      }
    } else {
      setMensagem('Agendamento não encontrado.');
    }
  };

  const enviarReagendamento = async () => {
    const res = await fetch('/api/reagendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numeroNota,
        novaData,
        novoPeriodo
      })
    });
    const data = await res.json();
    if (data.ok) {
      setMensagem('Reagendamento realizado com sucesso!');
      setPodeReagendar(false);
    } else {
      setMensagem(data.mensagem || 'Erro ao reagendar.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Reagendar Inspeção</h1>
      <label>Número da Nota:</label>
      <input
        type="text"
        value={numeroNota}
        onChange={(e) => setNumeroNota(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={buscarAgendamento}>Buscar Agendamento</button>

      {agendamento && (
        <div style={{ marginTop: 20 }}>
          <h3>Agendamento Atual</h3>
          <p><strong>Data:</strong> {new Date(agendamento.dataAtual).toLocaleDateString()}</p>
          <p><strong>Período:</strong> {agendamento.periodoAtual}</p>
          <p><strong>Localidade:</strong> {agendamento.localidade}</p>
        </div>
      )}

      {podeReagendar && (
        <div style={{ marginTop: 20 }}>
          <h3>Nova Data e Período</h3>
          <label>Nova Data:</label>
          <input
            type="date"
            value={novaData}
            onChange={(e) => setNovaData(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <label>Período:</label>
          <select
            value={novoPeriodo}
            onChange={(e) => setNovoPeriodo(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          >
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
          </select>
          <button onClick={enviarReagendamento}>Confirmar Reagendamento</button>
        </div>
      )}

      {mensagem && (
        <p style={{ marginTop: 20, color: 'blue' }}>{mensagem}</p>
      )}
    </div>
  );
}
