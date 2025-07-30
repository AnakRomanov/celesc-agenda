
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #003366, #FFD700)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#003366',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#fff' }}>
        Agendamento de Inspeção CELESC
      </h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '400px'
      }}>
        <Link href="/agendar">
          <button style={buttonStyle}>Agendar Inspeção</button>
        </Link>
        <Link href="/consulta">
          <button style={buttonStyle}>Consultar Agendamento</button>
        </Link>
        <Link href="/backoffice">
          <button style={buttonStyle}>Acessar Backoffice</button>
        </Link>
      </div>
    </div>
  )
}

const buttonStyle = {
  padding: '1rem',
  fontSize: '1.1rem',
  backgroundColor: '#FFD700',
  color: '#003366',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background 0.3s',
  width: '100%'
}
