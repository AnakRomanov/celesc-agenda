import React, { useState } from "react";

export default function BackofficeLogin() {
  const [senha, setSenha] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha === "admin123") {
      setAutenticado(true);
    } else {
      alert("Senha incorreta");
    }
  };

  return (
    <main style={styles.container}>
      {!autenticado ? (
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.title}>Backoffice CELESC</h2>
          <input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
      ) : (
        <div>
          <h2 style={styles.title}>Agendamentos</h2>
          <p>Em breve: tabela com filtros e ações.</p>
        </div>
      )}
    </main>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#0066cc",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.5rem",
    fontSize: "1rem",
    backgroundColor: "#0066cc",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
