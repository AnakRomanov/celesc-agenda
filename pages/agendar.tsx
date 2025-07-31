import { useState } from 'react';
import Calendario from '../components/Calendario';

export default function Agendar() {
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Agendar Inspeção</h1>
      <Calendario onSelectDate={setDataSelecionada} />
      {dataSelecionada && <p>Data selecionada: {dataSelecionada}</p>}
    </div>
  );
}
