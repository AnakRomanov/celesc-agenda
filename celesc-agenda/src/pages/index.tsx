import { useState } from "react";

export default function Home() {
  const [numeroNota, setNumeroNota] = useState("");
  const [nomeSolicitante, setNomeSolicitante] = useState("");
  const [localidade, setLocalidade] = useState("Criciúma e região");
  const [data, setData] = useState("");
  const [periodo, setPeriodo] = useState("Manhã");
  const [mensagem, setMensagem] = useState("");
  const [buscaNota, setBuscaNota] = useState("");
  const [agendamentoEncontrado, setAgendamentoEncontrado] = useState<any>(null);
  const [novaData, setNovaData] = useState("");
  const [novoPeriodo, setNovoPeriodo] = useState("Manhã");

  // Criar agendamento
  const agendar = async () => {
    setMensagem("");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numeroNota,
          nomeSolicitante,
          localidade,
          data,
          periodo,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setMensagem("Agendamento criado com sucesso!");
      } else {
        setMensagem(result.error || "Erro ao criar agendamento");
      }
    } catch (err) {
      setMensagem("Erro de conexão com servidor");
    }
  };

  // Buscar agendamento existente
  const buscar = async () => {
    setMensagem("");
    try {
      const res = await fetch("/api/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numeroNota: buscaNota }),
      });
      const result = await res.json();
      if (res.ok) {
        setAgendamentoEncontrado(result);
      } else {
        setMensagem(result.error || "Agendamento não encontrado");
      }
    } catch (err) {
      setMensagem("Erro ao buscar agendamento");
    }
  };

  // Reagendar
  const reagendar = async () => {
    if (!agendamentoEncontrado) return;
    setMensagem("");
    try {
      const res = await fetch("/api/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numeroNota: buscaNota,
          novaData,
          novoPeriodo,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setMensagem("Reagendamento realizado com sucesso!");
      } else {
        setMensagem(result.error || "Erro ao reagendar");
      }
    } catch (err) {
      setMensagem("Erro de conexão");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Agendamento de Inspeção - CELESC</h1>
      
      {/* Formulário de Agendamento */}
      <h2>Criar Novo Agendamento</h2>
      <input
        type="text"
        placeholder="Número da Nota"
        value={numeroNota}
        onChange={(e) => setNumeroNota(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Nome do Solicitante"
        value={nomeSolicitante}
        onChange={(e) => setNomeSolicitante(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />
      <select
        value={localidade}
        onChange={(e) => setLocalidade(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      >
        <option>Criciúma e região</option>
        <option>Araranguá e região</option>
      </select>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />
      <select
        value={periodo}
        onChange={(e) => setPeriodo(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      >
        <option>Manhã</option>
        <option>Tarde</option>
      </select>
      <button onClick={agendar} style={{ padding: "10px", background: "green", color: "white" }}>
        Agendar
      </button>

      <hr style={{ margin: "30px 0" }} />

      {/* Busca para reagendamento */}
      <h2>Buscar Agendamento para Reagendar</h2>
      <input
        type="text"
        placeholder="Número da Nota"
        value={buscaNota}
        onChange={(e) => setBuscaNota(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />
      <button onClick={buscar} style={{ padding: "10px", background: "blue", color: "white" }}>
        Buscar
      </button>

      {agendamentoEncontrado && (
        <div style={{ marginTop: "20px" }}>
          <p>Agendamento encontrado: {agendamentoEncontrado.dataAtual}</p>
          <h3>Reagendar</h3>
          <input
            type="date"
            value={novaData}
            onChange={(e) => setNovaData(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
          <select
            value={novoPeriodo}
            onChange={(e) => setNovoPeriodo(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          >
            <option>Manhã</option>
            <option>Tarde</option>
          </select>
          <button onClick={reagendar} style={{ padding: "10px", background: "orange", color: "white" }}>
            Confirmar Reagendamento
          </button>
        </div>
      )}

      {mensagem && <p style={{ color: "red", marginTop: "20px" }}>{mensagem}</p>}
    </div>
  );
}
