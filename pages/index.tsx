import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Agendamento de Inspeção CELESC</h1>
      <div style={{ marginTop: '2rem' }}>
        <Link href="/agendar"><button>Agendar Inspeção</button></Link>
        <Link href="/consulta"><button style={{ marginLeft: '1rem' }}>Consultar Agendamento</button></Link>
        <Link href="/reagendar"><button style={{ marginLeft: '1rem' }}>Reagendar</button></Link>
        <Link href="/backoffice"><button style={{ marginLeft: '1rem' }}>Acessar Backoffice</button></Link>
      </div>
    </div>
  );
}
