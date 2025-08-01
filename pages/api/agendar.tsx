
import { useState } from 'react';
import Calendario from '../components/Calendario';

export default function Agendar() {
  const [responsavel, setResponsavel] = useState('');
  const [numeroInstalacao, setNumeroInstalacao] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [confirmacaoEmailSAP, setConfirmacaoEmailSAP] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    if (!responsavel || !numeroInstalacao || !dataSelecionada || !confirmacaoEmailSAP) {
      setErro('Por favor, preencha todos os campos obrigatórios e confirme o checkbox.');
      return;
    }

    try {
      const response = await fetch('/api/agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responsavel,
          numeroInstalacao,
          data: dataSelecionada,
          confirmacaoEmailSAP
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem('Agendamento realizado com sucesso!');
        setResponsavel('');
        setNumeroInstalacao('');
        setDataSelecionada(null);
        setConfirmacaoEmailSAP(false);
      } else {
        setErro(data.error || 'Erro ao agendar.');
      }
    } catch (err) {
      setErro('Erro ao conectar com o servidor.');
    }
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
            {' '}
            Confirmo que atualizei o e-mail do solicitante no SAP CRM, a confirmação do agendamento será enviada para esse endereço de e-mail.
          </label>
        </div>
        <button type="submit">Agendar</button>
      </form>
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
}
