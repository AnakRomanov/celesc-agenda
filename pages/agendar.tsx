
import { useState } from 'react';
import Calendario from '../components/Calendario';

export default function Agendar() {
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [responsavel, setResponsavel] = useState('');
  const [numeroInstalacao, setNumeroInstalacao] = useState('');
  const [confirmacaoEmailSAP, setConfirmacaoEmailSAP] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responsavel || !numeroInstalacao || !dataSelecionada || !confirmacaoEmailSAP) {
      alert('Por favor, preencha todos os campos obrigatórios e confirme o checkbox.');
      return;
    }

    // Aqui você pode enviar os dados para a API
    console.log({
      responsavel,
      numeroInstalacao,
      dataSelecionada,
      confirmacaoEmailSAP
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Agendar Inspeção</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Responsável pelo agendamento *</label><br />
          <input
            type="text"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Número da instalação *</label><br />
          <input
            type="text"
            value={numeroInstalacao}
            onChange={(e) => setNumeroInstalacao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data da inspeção *</label><br />
          <Calendario onSelectDate={setDataSelecionada} />
          {dataSelecionada && <p>Data selecionada: {dataSelecionada}</p>}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={confirmacaoEmailSAP}
              onChange={(e) => setConfirmacaoEmailSAP(e.target.checked)}
              required
            />
            {' '}Confirmo que atualizei o e-mail do solicitante no SAP CRM, a confirmação do agendamento será enviada para esse endereço de e-mail *
          </label>
        </div>
        <button type="submit">Agendar</button>
      </form>
    </div>
  );
}
