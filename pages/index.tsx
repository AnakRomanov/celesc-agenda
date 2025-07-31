import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Agendamento de Inspeção CELESC</h1>
      <ul>
        <li><Link href="/agendar">Agendar Inspeção</Link></li>
        <li><Link href="/consulta">Consultar Agendamento</Link></li>
        <li><Link href="/reagendar">Reagendar</Link></li>
        <li><Link href="/backoffice">Acessar Backoffice</Link></li>
      </ul>
    </div>
  );
}
