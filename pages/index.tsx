import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Agendamento de Inspeção CELESC</h1>
      <ul>
        <li><Link href="/agendar">Agendar</Link></li>
        <li><Link href="/consulta">Consultar</Link></li>
        <li><Link href="/reagendar">Reagendar</Link></li>
        <li><Link href="/backoffice">Backoffice</Link></li>
      </ul>
    </div>
  );
}
