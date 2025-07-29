import React from "react";

export default function Home() {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Agenda CELESC</h1>
      <p style={styles.subtitle}>Aplicação rodando com sucesso no Vercel 🚀</p>
      <p style={styles.info}>
        Estrutura com Pages Router (Next.js 14) + API `/api/schedule`
      </p>
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
    backgroundColor: "#f5f5f5",
    margin: 0,
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#0066cc",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "0.5rem",
    color: "#333",
  },
  info: {
    fontSize: "1rem",
    color: "#666",
  },
};
