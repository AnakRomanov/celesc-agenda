import { useState } from 'react';
import Calendario from './components/Calendario';


export default function Agendar() {
  const [localidade, setLocalidade] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('');

  return (
    <div>
      <h1>Agendamento</h1>

      <label>Localidade:</label>
      <input
        type="text"
        value={localidade}
        onChange={(e) => setLocalidade(e.target.value)}
      />

      <label>Data da Inspeção:</label>
      <Calendario
        localidade={localidade}
        onDataSelecionada={(data) => setDataSelecionada(data.toISOString())}
      />

      <p>Data selecionada: {dataSelecionada}</p>
    </div>
  );
}
