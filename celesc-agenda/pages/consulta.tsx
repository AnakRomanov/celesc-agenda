import React, { useState } from "react";

export default function Consulta() {
  const [numeroNota, setNumeroNota] = useState("");
  const [agendamento, setAgendamento] = useState(null);
  const [novaData, setNovaData] = useState("");
  const [novoPeriodo, setNovoPeriodo] = useState("MANHA");
  const [mensagem, setMensagem] = useState("");

  const consultar = async () => {
    setMensagem("Consultando...");
    const res = await fetch("/api/consultar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numeroNota }),
    });
    const data = await res.json();
    if (res.ok) {
      setAgendamento(data);
      setMensagem("");
    } else {
      setMensagem(data.error || "Erro ao consultar.");
    }
  };

  const reagendar = async () => {
    setMensagem("Reagendando...");
    const res = await fetch("/api/reagendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numeroNota,
        novaData,
        novoPeriodo,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setMensagem("Reagendamento realizado com sucesso!");
      setAgendamento(data);
    } else {
      setMensagem(data.error || "Erro ao reagendar.");
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Consultar Agendamento</h1>
      <input
        type="text"
        placeholder="Número da Nota"
        value={numeroNota}
        onChange={(e) => setNumeroNota(e.target.value)}
        style={styles.input}
      />
      <button onClick={consultar} style={styles.button}>
        Consultar
      </button>

      {mensagem && <p>{mensagem}</p>}

      {agendamento && (
        <div style={styles.card}>
          <p><strong>Nome:</strong> {agendamento.nomeSolicitante}</p>
          <p><strong>Localidade:</strong> {agendamento.localidade}</p>
          <p><strong>Data Atual:</strong> {agendamento.dataAtual?.split("T")[0]}</p>
          <p><strong>Período Atual:</strong> {agendamento.periodoAtual}</p>
          <p><strong>Status:</strong> {agendamento.status}</p>
          <p><strong>Reagendamentos:</strong> {agendamento.quantidadeReagendamentos}</p>

          {agendamento.status !== "CONCLUIDO" &&
            agendamento.quantidadeReagendamentos < 1 && (
              <>
                <h3>Reagendar</h3>
                <input
                  type="date"
                  value={novaData}
                  onChange={(e) => setNovaData(e.target.value)}
                  style={styles.input}
                />
                <select
                  value={novoPeriodo}
                  onChange={(e) => setNovoPeriodo(e.target.value)}
                  style={styles.input}
                >
                  <option value="MANHA">Manhã</option>
                  <option value="TARDE">Tarde</option>
                </select>
                <button onClick={reagendar} style={styles.button}>
                  Confirmar Reagendamento
                </button>
              </>
            )}
        </div>
      )}
    </main>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#0066cc",
  },
  input: {
    padding: "0.5rem",
    marginBottom: "1rem",
    width: "100%",
    maxWidth: "400px",
    display: "block",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#0066cc",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    maxWidth: "500px",
  },
};
